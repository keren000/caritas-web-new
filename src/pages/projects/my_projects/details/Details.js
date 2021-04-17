import {
	Grid,
	Container,
	Paper,
	Typography,
	Button,
	CardMedia,
	AppBar,
	Toolbar,
} from "@material-ui/core"
import React, { useState, useEffect, ChangeEvent } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Overview from "./Overview"
import ContributedUser from "./ContributedUser"
import { Link } from "react-router-dom"
import { db, auth, storage } from "../../../../Firebase/Firebase"
import FavoriteIcon from "@material-ui/icons/Favorite"
import IconButton from "@material-ui/core/IconButton"
import CardActionArea from "@material-ui/core/CardActionArea"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import DetailsContainer from './DetailsContainer'
import NavProjects from './NavProjects'
import { useHistory } from "react-router-dom"
import { useParams,useLocation } from 'react-router-dom'
import ShareIcon from '@material-ui/icons/Share';
import ShareDialog from './ShareDialog'
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(7),
		flexGrow: 1,
		overflow: "hidden",
	},
	app: {
		backgroundColor: "#FFF",
	},
	logo: {
		flexGrow: 1,
		width: "170px",
		height: "180px",
	},
	paper: {
		padding: theme.spacing(4, 3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(2, 4),
		},
	},
	image: {
		marginTop: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			height: "250px",
		},
		[theme.breakpoints.only("sm")]: {
			width: "100%",
			height: "400px",
		},
		[theme.breakpoints.only("md")]: {
			width: "100%",
			height: "450px",
		},
		[theme.breakpoints.up("lg")]: {
			width: "80%",
			height: "450px",
		},
	},
	overview: {
		marginTop: theme.spacing(5),
	},
	contributed: {
		marginTop: theme.spacing(-30),
	},
	donate: {
		marginTop: "-20px",
		// backgroundColor: "#E6EFEE",
		width: "100%",
		height: "80px",
	},
	right: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		variant: "contained",
		backgroundColor: "#0133C0",
		width: "120px",
		fontWeight: 'bold',
		borderRadius: "5px",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#214DC5",
		},
	},
	link: {
		color: "#000",
		"&:hover": {
			color: "#214DC5",
		},
		fontSize: 18,
		textTransform: "capitalize",
		textDecoration: "none",
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	  },
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	  },
	content:{
		padding: theme.spacing(4),
	},
	contentpaper:{
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		flexGrow: 1,
	},
	end: {
		padding: theme.spacing(4),
	}
}))

let userUID = ""
let projectId = ""
let docId = ""

function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

export default function Details(props) {
	const classes = useStyles()
	const urlBase = 'https://caritasrevolution.com';
	const handleAdd = () => {
		setOpen(true);
		setFormMode(true);
	  };
	  const handleDone = () => {
		setOpen(false)
	  }
	  const [ope, setOpen] = useState(false)
	  const [formMode, setFormMode] = useState(true)

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const refProjects = db.collection("projects")
	const [projectData, setProjectData] = useState([])
	const refDonations = db.collection("donations")
	const [user, setUser] = useState(auth().currentUser)
	const [contributedUser, setContributedUser] = useState([])
	let userUid = user.uid
	let profilPlaceholder =
		"https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2Fusers%2Ficons8-user.png?alt=media&token=9b987b19-7b8a-4051-922e-f5d2cb838ce0"
	const [favoriteState, setFavoriteState] = useState(true)
	const [contributedState, setContributedState] = useState(false)
	const refFavotiteProjects = db.collection("favourite_projects")
	const [isFavourite, setisFavourite] = useState(false)
	// const [milestones, setMilestones] = useState(projectData?.project_milestones)
	// const [query, setQuery] = useState(props.location.state?.project_data?.project_id);
    const history = useHistory()
	let query = useQuery();

	async function isUserAlreadyLikeProject(userUID, projectId) {
		const favProjects = await db
			.collection("favourite_projects")
			.where("user_id", "==", userUID)
			.where("project_id", "==", projectId)
			.get()

		if (favProjects.docs.length > 0) {
			docId = favProjects.docs[0].id
			setContributedState(favProjects.docs[0].data().contributed)
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		let id = query.get("id")
		projectId = id
		getProjects(id)
		getContributedUsers(id)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		// setisFavourite(props.isFavourite)
		userUID = auth().currentUser.uid
	}, [])

	async function getProjects(projectId) {
		refProjects
			.doc(projectId)
			.get()
			.then(async function (querySnapshot) {
				console.log(querySnapshot.data())
				const _project = querySnapshot.data()
				_project["project_id"] = querySnapshot.id
				setisFavourite(isUserAlreadyLikeProject(userUID, projectId))
				setProjectData(_project)
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error)
			})
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	async function getProfilPicFromDB(userUID) {
		await storage
			.ref()
			.child("images/users")
			.child(userUID)
			.getDownloadURL()
			.then((url) => {
				return url
			})
			.catch((error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case "storage/object-not-found":
						// File doesn't exist
						break
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break
					case "storage/canceled":
						// User canceled the upload
						break

					// ...

					case "storage/unknown":
						// Unknown error occurred, inspect the server response
						break
				}
			})
	}

	async function handleFavorite(event) {
		event.stopPropagation()
		event.preventDefault()
		projectId = projectData["project_id"]
		setFavoriteState(favoriteState)

		if (await isUserAlreadyLikeProject(userUID, projectId)) {
			if (contributedState) {
				console.log("YES CONTRIBUTED")
				refFavotiteProjects.doc(docId).update({
					favourite: !favoriteState,
				})
			} else {
				refFavotiteProjects
					.doc(docId)
					.delete()
					.then(function () {
						console.log("Document successfully deleted!")
					})
					.catch(function (error) {
						console.error("Error removing document: ", error)
					})
			}
		} else {
			refFavotiteProjects
				.add({
					contributed: contributedState,
					favourite: favoriteState,
					project_id: projectId,
					user_id: userUID,
				})
				.then(function (docRef) {
					console.log("Document written with ID: ", docRef.id)
				})
				.catch(function (error) {
					console.error("Error adding document: ", error)
				})
		}
	}

	async function getContributedUsers(projectId) {
		refDonations
			.where("project_id", "==", projectId)
			.orderBy("created_at", "desc")
			.get()
			.then(async function (querySnapshot) {
				const items = []
				for (var i = 0; i < querySnapshot.docs.length; i++) {
					const userName = querySnapshot.docs[i].data()["user_name"]

					if(items.indexOf(userName)<0){
					items.push(userName)
					}
					// setContributedUser((passedCUser) => [...passedCUser, userName])
					setContributedUser(items)
				}
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error)
			})
	}

	const contributedComponents = contributedUser.map((user, index) => (
		<ContributedUser
			key={index}
			contributedUser={user}
		/> 
	))

	const milestoneComponents = Object.values(
		projectData?.project_milestones || {}
	).map((milestone, index) => (
		<Typography
			key={index}
			variant="subtitle1"
			color="textSecondary"
			style={{ textAlign: "justify" }}
		>
			{milestone}
		</Typography>
	))

	return (
		<>
			< NavProjects />
		<DetailsContainer>
		<Grid container justify="flex-end">
		 <IconButton><ShareIcon onClick={handleAdd} style={{color: "2057c0"}}/></IconButton>
		 </Grid>
		<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
		{projectData?.project_charity}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
				{projectData?.project_location?.country} .{" "}
				{projectData?.cause_display_name}
            </Typography>
			<div className={classes.heroButtons}>
			<Grid container justify="center" align="center">
                <Grid item xs={12}>
                 
                <img
					src={projectData?.project_assets?.image}
					alt={projectData?.project_charity}
					className={classes.image}
				/>
                </Grid>
              </Grid>
			</div>
			<div className={classes.cardGrid}>
				<Grid container spacing={4}>
					<div className={classes.card}>
						<Typography component="h5" variant="h5">
							Project Goal
						</Typography>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							style={{ textAlign: "justify" }}
						>
							{projectData?.project_description}
						</Typography>
						<div style={{ padding: "15px" }} />
						<Typography component="h5" variant="h5">
							NGO and Location
						</Typography>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							style={{ textAlign: "justify" }}
						>
							{projectData?.project_ngo_location}
						</Typography>
						<div style={{ padding: "15px" }} />
						<Typography component="h5" variant="h5">
							Project Milestone
						</Typography>
						{milestoneComponents}
						<div style={{ padding: "15px" }} />
				    </div>
			    </Grid>
				<div style={{ padding: "15px" }} />
				<Grid container justify="center" align="center">
					<Grid item xs={12}>
						<Overview
							url={`https://www.youtube.com/watch?v=${projectData?.project_assets?.youtube_video_id}`}
			            />
				    </Grid>
				</Grid>
				<div className={classes.content}>
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.contentpaper} elevation={0}>
								${projectData?.donated_amount?.toFixed(2)} of ${projectData?.project_funding_goal?.amount} raised
							</Paper>
                        </Grid>
						<Grid item xs>
						  <Paper className={classes.contentpaper} elevation={0}>
							<Button
								style={{marginTop:'-5px', textTransform: "capitalize" }}
								className={classes.button}
								to={{
									pathname: "/donation",
									state: {
										project_data: projectData,
									 },
									}}
									component={Link}
							>
								Donate
							</Button>
						  </Paper>
                        </Grid>
						<Grid item xs>
							<Paper className={classes.contentpaper} elevation={0}>
								<IconButton
									aria-label="add to favorites" 
									onClick={handleFavorite}
									style={{
										marginTop: '-7px',
										color: isFavourite ? "red" : "light-grey"
										}}
								>
									<FavoriteIcon />
                                </IconButton>
							</Paper>
                        </Grid>
                    </Grid>
				</div>
				<div className={classes.end}>
					<Grid container>
						<Grid item>
						<Typography style={{ fontWeight: "bold" }}>
								Who has contributed?
						</Typography>
							  {contributedComponents}
                           
						</Grid>
					</Grid>
				</div>
			</div>
			
		</DetailsContainer>
		<ShareDialog
             open={ope}
             close={handleDone}
             formMode={formMode}
			 URL={urlBase+'details?id='+projectId}
             />
		</>
	)
}
