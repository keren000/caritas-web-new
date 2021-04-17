import { Input } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Avatar, Grid, IconButton, Tooltip } from "@material-ui/core"

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import firebase, { db } from "../../Firebase/Firebase"

const ProfileImage = () => {
	const [profileUrl, setProfileUrl] = useState("")

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				db.collection("users")
					.doc(user.uid)
					.get()
					.then((userSnapshot) => {
						let pUrl
						if (userSnapshot.data()) {
							pUrl = userSnapshot.data().profileUrl
							setProfileUrl(pUrl)
						}
					})
			}
		})

		return unsubscribe
	}, [])

	const handleImage = async (event) => {
		if (!event.target.files.length) return

		const user = firebase.auth().currentUser

		// if (user.profileUrl) {
		// 	// delete the existing profile url
		// }
		const file = event.target.files[0]

		const storageRef = firebase.storage().ref()
		const iconsRef = storageRef.child(`users/${user.uid}${file.name}`)
		const snapshot = await iconsRef.put(file)
		const downloadUrl = await snapshot.ref.getDownloadURL()
		setProfileUrl(downloadUrl)
		// save the new profile url to the user's document
		db.collection("users").doc(user.uid).update({
			profileUrl: downloadUrl,
		})
	}

	return (
		<div>
			<Grid item>
				<div>
					<Input
						multiple
						type="file"
						id="upload"
						accept="image/*"
						style={{ display: "none" }}
						onChange={handleImage}
					/>
					<label htmlFor="upload">
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="span"
						>
							<Tooltip title="Edit Profile Picture" placement="top">
								<Avatar
									id="avatar"
									src={profileUrl}
									style={{
										width: "60px",
										height: "60px",
									}}
								/>
							</Tooltip>
							<AddAPhotoIcon
								style={{
									marginLeft: "55px",
									marginTop: "50px",
									position: "absolute",
								}}
								onChange={handleImage}
							/>
						</IconButton>
						{/* <Button onClick = {handleUpload}>Upload</Button>  */}
					</label>
					<label htmlFor="avatar" />
				</div>
			</Grid>
		</div>
	)
}

export default ProfileImage
