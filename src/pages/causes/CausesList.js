import { React, useState, useEffect } from "react"
import { Button, Grid, Typography, Box, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import { auth, db } from "../../Firebase/Firebase"
import ItemsCarousel from "react-items-carousel"

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(14),
		[theme.breakpoints.only("xl")]: {
			marginTop: theme.spacing(60),
		   },
	},
	causesContent: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "normal",
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: "center",
		color: theme.palette.text.secondary,
		elevation: 0.5,
		marginLeft: 10,
		marginBottom: 10,
	},
	typography1: {
		fontWeight: "bold",
		color: "#000",
		fontSize: "18px",
		marginLeft: 40,
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
		color: "#0133C0",
		"&:hover": {
			color: "#13A4AE",
			backgroundColor: "#FAFAFA",
		},
		marginRight: theme.spacing(3),
		fontWeight: "bold",
	},
	imageComponent: {
		width: 100,
		height: 100,
	},
	flexContainer: {
		display: "flex",
		flexDirection: "row",
		padding: 0,
	},
}))

let newArray = []

function CausesList() {
	const classes = useStyles()
	const refUser = db.collection("users")
	const [user, setUser] = useState()
	const [causes, setCauses] = useState([])
	const refCauses = db.collection("cause_types")
	const refDonations = db.collection("donations")
	const [activeItemIndex, setActiveItemIndex] = useState(0)
	const chevronWidth = 20

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
			getUsersCauses(user.uid)
		}
		// eslint-disable-next-line
	}, [user])

	async function getUsersCauses(userUID) {
		const userDoc = await refUser.doc(userUID).get()

		const userDocData = userDoc.data()
		if (userDocData) {
			const causePromises = userDocData?.causes?.map((causeId) => {
				return getCauseData(causeId)
			})
			const causes = await Promise.all(causePromises)

			setCauses(causes)
		}
	}

	async function getCauseData(causeId) {
		return refCauses
			.doc(causeId)
			.get()
			.then((cause) => {
				const data = cause.data()
				return refDonations
					.where("cause_display_name", "==", data["cause_display_name"])
					.where("user_id", "==", user.uid)
					.get()
					.then((querySnapshot) => {
						let totalAmount = 0

						querySnapshot.forEach((doc) => {
							totalAmount += doc.data()["amount"]
						})

						data["total_amount"] = parseFloat(totalAmount)
						return data
					})
			})
	}

	function convertArray(_array) {
		let obj = {}
		for (var i = 0; i < _array.length; i++) {
			const _vr = _array[i]
			obj[_vr] = true
		}
		return [obj]
	}
	return (
		<div className={classes.root}>
			<Grid container className={classes.root}>
				<Grid item>
					<Typography className={classes.typography2}>My Causes</Typography>
				</Grid>
				<Grid item className={classes.right}>
					<Button
						to={{ pathname: "/causes-grid", state: { choice: newArray } }}
						component={Link}
						className={classes.button}
					>
						<AddIcon style={{ color: "#0133C0" }} />
					</Button>
				</Grid>
			</Grid>
			<div className={classes.causesContent}>
				{!causes.length ? (
					<Typography style={{ color: "#A4A4A4", fontSize: "18px" }}>
						Add causes you care about
					</Typography>
				) : (
					<>
						{causes.map((cause, index) => (
							<Paper className={classes.paper} key={index}>
								<Grid
									container
									spacing={3}
									alignItems="center"
									justify="center"
								>
									<Grid item xs={12} lg={2} md={2}>
										<img
											src={cause.icon}
											alt={cause.cause_display_name}
											className={classes.imageComponent}
										/>
									</Grid>
									<Grid item xs={12} lg={8} md={8}>
										<Box style={{ textAlign: "center" }}>
											<Typography className={classes.typography1}>
												{cause.cause_display_name}
											</Typography>
											<Typography style={{ marginLeft: "50px" }}>
												${cause.total_amount.toFixed(2)} donated{" "}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</Paper>
						))}
					</>
				)}
			</div>
		</div>
	)
}

export default CausesList