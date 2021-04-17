import { useState, useEffect } from "react"
import React from "react"
import { db, auth } from "../../../Firebase/Firebase"
// import Projects from "../../../components/Projects"
import Card from "../../Card_"
import {Grid} from '@material-ui/core'

function Contributed() {
	const refFavotiteProjects = db.collection("favourite_projects")
	const [user, setUser] = useState(auth().currentUser)
	const [projects, setProjects] = useState([])
	const userUid = user.uid
	const refProjects = db.collection("projects")
	const refRecurrentDonation = db.collection("recurrent_donations")

	useEffect(() => {
		getContributedProjects(userUid)
		// eslint-disable-next-line
	},[])

	const getReccuringDonation = async(userUid, projectId) =>{
		return refRecurrentDonation
		.where("user_id", "==", userUid)
		.where("project_id", "==", projectId)
		.where("status","==", 1)
		.get()
			.then((recurrentDoc) => {
				if(recurrentDoc.docs.length > 0){
				const data = recurrentDoc.docs[0].data().next_donation_date.seconds
				console.log('RECURRING DATA -------------------- ', data)
						return data
				}
			})
	}

	const getContributedProjects = async (userUid) => {
		try {
			const favoriteSnapshot = await refFavotiteProjects
				.where("user_id", "==", userUid)
				.where("contributed", "==", true)
				.get()
				
			favoriteSnapshot.forEach(async function (doc) {
				var id = doc.data()["project_id"]
				const projectSnapshot = await refProjects
				.doc(id)
				.get()
				.then(async doc => {
					const projectData = doc.data()
						projectData["project_id"] = id
						projectData["next_donation_date"] =  await getReccuringDonation(userUid, id)
					setProjects((projects)=>[...projects, projectData])
				  }).catch(error => {
					console.log("Error getting document:", error);
				  });
			})
		} catch (error) {
			console.log("Error getting documents: ", error)
		}
	}

	const projectComponent = (projects) => {
		return projects.map((project, index) => (
			<Grid spacing={3}
			direction="row"
			xs={12}
				sm={12}
				md={6}
			style={{ marginBottom: 12 }}>
			<Card
				key={index}
				id={index}
				img={project["project_assets"]["image"]}
				country={project["project_location"]["country"]}
				cause={project["cause_display_name"]}
				name={project["project_charity"]}
				description={project["project_description"]}
                isFavourite = {true}
				project_data={project}
			/>
			</Grid>
		))
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "space-around",
			}}
		>
			{projectComponent(projects)}
		</div>
	)
}

export default Contributed;