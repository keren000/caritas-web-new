import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { auth, db } from "../../Firebase/Firebase"
import TransactionHistory from "./TransacHistory"

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(14),
	},
	typography2: {
		fontWeight: "bold",
		fontSize: "18px",
		marginLeft: theme.spacing(3),
	},

	container: {
		marginLeft: theme.spacing(3),
	},
	right: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		fontSize: 18,
		textTransform: "capitalize",
		color: "#13B0BB",
		"&:hover": {
			color: "#13A4AE",
			backgroundColor: "#FAFAFA",
		},
		marginRight: theme.spacing(3),
		fontWeight: "bold",
	},
}))

function History() {
	const classes = useStyles()
	const [userContribution, setUserContribution] = useState([])
	const refDonations = db.collection("donations")
	const [user, setUser] = useState()

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser)
			}
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		if (user) {
			getUserContribution(user.uid)
		}
		// eslint-disable-next-line
	}, [user])

	async function getUserContribution(userUID) {
		try {
			const donationsSnapshots = await refDonations
				.where("user_id", "==", userUID)
				.orderBy("created_at", "desc")
				.get()

			const donations = []
			donationsSnapshots.forEach((d) => donations.push(d.data()))

			setUserContribution(donations)
		} catch (error) {
			console.log("Error getting documents: ", error)
		}
	}

	const transactionComponent = userContribution.map((contribution, index) => (
		<TransactionHistory contribution={contribution} key={index} />
	))

	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item>
					<Typography className={classes.typography2}>
						Transaction History
					</Typography>
				</Grid>
			</Grid>

			<div style={{ padding: "15px" }} />

			<Grid container spacing={1} className={classes.container}>
				<Grid item>
					{transactionComponent.length == 0 ? (
						<Typography style={{ color: "#A4A4A4", fontSize: "18px" }}>
							No transactions found
						</Typography>
					) : (
						transactionComponent
					)}
				</Grid>
			</Grid>
		</div>
	)
}

export default History