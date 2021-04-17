import React, { useState, useEffect } from "react"
import ItemsCarousel from "react-items-carousel"
import { withStyles } from "@material-ui/core/styles"
import {
	CardMedia,
	Grid,
	Typography,
	AppBar,
	Toolbar,
	IconButton,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import FavoriteIcon from "@material-ui/icons/Favorite"
import red from "@material-ui/core/colors/red"
import { Button } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { auth, db } from "../../Firebase/Firebase"
import CardProjectRaise from "../../pages/projects/my_projects/details/CardProjectRaise"
import CauseCard from "./CauseCard"
import Navbar from "../Navbar"

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		overflow: "hidden",
	},
	logo: {
		flexGrow: 1,
		width: "170px",
		height: "180px",
	},
	content: {
		overflow: "hidden",
		marginTop: theme.spacing(15),
	},
	typography: {
		fontWeight: "bold",
		fontSize: "18px",
		marginLeft: theme.spacing(3),
	},
	count: {
		[theme.breakpoints.only("xs")]: {
			fontSize: "12px",
			marginTop: "10px",
		},
	},
	typography1: {
		fontWeight: "bold",
		color: "#000",
		fontSize: "15px",
		[theme.breakpoints.only("xs")]: {
			fontSize: "10px",
		},
	},
	typography2: {
		fontWeight: "bold",
		fontSize: "18px",
		marginLeft: theme.spacing(3),
	},
	paper: {
		padding: theme.spacing(1),
		overflow: "hidden",
		textAlign: "center",
		color: theme.palette.text.secondary,
		elevation: 1,
		[theme.breakpoints.only("xs")]: {
			width: "70px",
		},
		[theme.breakpoints.only("sm")]: {
			// width: '200px',
		},
	},
	imageComponent: {
		width: 100,
		height: 100,
		[theme.breakpoints.only("xs")]: {
			width: 50,
			height: 50,
		},
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
			color: "#224DC8",
			backgroundColor: "#FFF",
		},
		marginRight: theme.spacing(3),
		fontWeight: "bold",
	},
	add: {
		[theme.breakpoints.only("xs")]: {
			width: "20px",
		},
	},
	img: {
		[theme.breakpoints.only("sm")]: {
			display: "none",
		},
		[theme.breakpoints.only("xs")]: {
			display: "none",
		},
	},
	app: {
		backgroundColor: "#FFF",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FAFAFA",
		"&:hover": {
			backgroundColor: "#FAFAFA",
		},
		marginRight: theme.spacing(5),
		width: "100%",
		[theme.breakpoints.only("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
		[theme.breakpoints.only("xs")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
		[theme.breakpoints.only("lg")]: {
			width: "350px",
		},
		[theme.breakpoints.only("md")]: {
			width: "300px",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#0133C0",
	},
	inputRoot: {
		color: "#000",
	},
	inputInput: {
		padding: theme.spacing(2, 2, 2, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	account_icon: {
		marginLeft: theme.spacing(-3),
	},
})

function Slider(props) {
	const { classes } = props
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const [activeItemIndex, setActiveItemIndex] = useState(0)
	const [causes, setCauses] = useState([])
	const chevronWidth = 40
	const refCauses = db.collection("cause_types")
	const [user, setUser] = useState(auth().currentUser)
	const userUid = user.uid
	const [projects, setProjects] = useState([])
	const refProjects = db.collection("projects")
	const refDonations = db.collection("donations")
	const refFavotiteProjects = db.collection("favourite_projects")
	const [contributedProjectsCount, setContributedProjectsCount] = useState(0)
	const [donationAmountCount, setDonationAmountCount] = useState(0)

	function getCauses() {
		refCauses.onSnapshot((querySnapshot) => {
			const items = []
			querySnapshot.forEach((doc) => {
				items.push(doc.data())
			})
			setCauses(items)
		})
	}

	useEffect(() => {
		getCauses()
	}, [])

	useEffect(() => {
		getContributedProjects(userUid)
	}, [])

	useEffect(() => {
		getDonationsListForUsers(userUid)
	}, [])

	const getContributedProjects = async (userUid) => {
		var contributed = 0
		try {
			const favoriteSnapshot = await refFavotiteProjects
				.where("user_id", "==", userUid)
				.where("contributed", "==", true)
				.get()

			favoriteSnapshot.forEach(async function (doc) {
				var id = doc.data()["project_id"]

				await refProjects
					.doc(id)
					.get()
					.then(function (querySnapshot) {
						const _projectData = querySnapshot.data()
							  _projectData["project_id"] = querySnapshot.id
						setProjects((projects) => [...projects, _projectData])
						contributed++
						setContributedProjectsCount(contributed)
					})
			})
		} catch (error) {
			console.log("Error getting documents: ", error)
		}
	}

	const getDonationsListForUsers = async (userUid) => {
		var _amount = 0
		try {
			const donationSnapshot = await refDonations
				.where("user_id", "==", userUid)
				.get()

			donationSnapshot.forEach(async function (doc) {
				var amount = doc.data()["amount"]
				_amount += amount
				setDonationAmountCount(_amount)
			})
		} catch (error) {
			console.log("Error getting documents: ", error)
		}
	}

	const projectComponent = projects.map((project, index) => (
		<CardProjectRaise
			key={index}
			image_={project["project_assets"]["image"]}
			name={project["project_name"]}
			country={project["project_location"]["country"]}
			cause={project["cause_display_name"]}
			project_data={project}
		/>	

	))

	return (
		<div className={classes.root}>
			<Navbar />
			<div className={classes.content}>
				<Typography className={classes.typography}>Explore Causes</Typography>
				<div style={{ padding: "10px" }} />
				<Grid container spacing={3} justify="center" style={{padding: '10px'}}>
					{causes.map((cause, index) => (
						<Grid item sm={4} xs={4} lg={2} md={4}>
							<CauseCard cause={cause} key={index} causeIndex={index} classes={classes} />
						</Grid>
					))}
				</Grid>
				<div style={{ padding: "20px" }} />

				<Grid container>
					<Grid item>
						<Typography className={classes.typography2}>My Projects</Typography>
					</Grid>
					<Grid item className={classes.right}>
						<Button
							to="/my-projects"
							component={Link}
							className={classes.button}
						>
							See All
						</Button>
					</Grid>
				</Grid>

				<div style={{ padding: "15px" }} />

				<Grid container spacing={1} className={classes.container}>
					<Grid item>
						<FavoriteIcon style={{ color: red[500] }} />
					</Grid>
					
					<Grid item xs={10}>
						<Typography style={{ color: "#A4A4A4", fontSize: "18px" }}>
							You've helped {contributedProjectsCount} projects raise $
							{donationAmountCount.toFixed(2)}
						</Typography>
					</Grid>
					<div style={{padding: '10px'}} />
				</Grid>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-around",
						padding: '40px',
						alignItems: 'stretch'
						
					}}
				>
					{projectComponent}
				</div>


			</div>
		</div>
	)
}

export default withStyles(styles)(Slider)