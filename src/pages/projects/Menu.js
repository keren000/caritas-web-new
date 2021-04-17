import { React, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { auth, db } from "../../Firebase/Firebase"
import Card from "../Card"
import { Grid } from "@material-ui/core"
import SimpleBackdrop from "../projects/my_projects/details/SimpleBackdrop"

function TabPanel(props) {
	const { children, value, index, classes, ...other } = props
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: "#FFF",
		marginTop: theme.spacing(10),
	},
}))

export default function Menu(props) {
	const classes = useStyles()
	const [value, setValue] = useState(props.causeIndex+1)
	const [filterValue, setFilterValue] = useState(props.causeIndex)
	const refProjects = db.collection("projects")
	const refCauses = db.collection("cause_types")
	const [projects, setProjects] = useState([])
	const userUID = auth().currentUser.uid
	const [open, setOpen] = useState(false);
	const [causes, setCauses] = useState([]);

	useEffect(() => {
		getCauses()
		getProjects()
		// eslint-disable-next-line
	}, [])

	function getCauses() {
		const items = []
        refCauses.onSnapshot((querySnapshot)=> {
            querySnapshot.forEach((doc)=>{
				let causeName = doc.data().cause_display_name
				items.push(causeName)
            });
			setCauses(items)
        })
    }

	async function getProjects() {
		refProjects
			.get()
			.then(async function (querySnapshot) {
				const items = []
				for (var i = 0; i < querySnapshot.docs.length; i++) {
					const projectData = querySnapshot.docs[i].data()
					projectData["project_id"] = querySnapshot.docs[i].id
					projectData["favorite"] = await isUserAlreadyLikeProject(
						userUID,
						querySnapshot.docs[i].id
					)
					items.push(projectData)
				}
				items.sort((a, b) => {
					return a.cause_id - b.cause_id
				})
				setProjects(items)
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error)
			})
	}

	function handleLike() {
		getProjects()
	}

	async function isUserAlreadyLikeProject(userUID, project_id) {
		const favProjects = await db
			.collection("favourite_projects")
			.where("project_id", "==", project_id)
			.where("user_id", "==", userUID)
			.get()

		if (favProjects.docs.length > 0) {
			if (favProjects.docs[0].data().favourite) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	const projectComponent = (projects) => {
		return projects.map((project, index) => (
			<Grid
				spacing={3}
				xs={12}
				sm={6}
				md={4}
				style={{ marginBottom: 12 }}
				key={index}
			>
				<Card
					key={index}
					id={index}
					img={project["project_assets"]["image"]}
					country={project["project_location"]["country"]}
					cause={project["cause_display_name"]}
					name={project["project_charity"]}
					description={project["project_description"]}
					project_data={project}
					isFavourite={project["favorite"]}
					handleLike={handleLike}
				/>
			</Grid>
		))
	}

	const causesComponent = causes.map((el, index) => (
		<Tab
			key={index}
			label={el}
			onClick={() => {
				setValue(index + 1)
				setFilterValue(index)
			}}
			style={{ textTransform: "capitalize", fontSize: "16px" }}
		/>
	))

	return (
		<div className={classes.root}>
			<div style={{padding: '10px'}} />
			<AppBar
				position="static"
				style={{ color: "#FAFAFA", backgroundColor: "#ffffff" }}
				elevation={0}
			>
				<Tabs
					value={value}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					<Tab
						label="All Causes"
						{...a11yProps(0)}
						style={{ textTransform: "capitalize", fontSize: "16px" }}
						onClick={() => {
							setValue(0)
							setFilterValue(0)
						}}
					/>
					{causesComponent}
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={value}>
				<Grid container>
				{value == 0?
				<Grid container>{projectComponent(projects)}</Grid>
					: projectComponent(projects.filter((el) => el.cause_display_name === causes[filterValue])).length == 0? 
					<Typography alignCenter >No project Found</Typography> 
					: projectComponent(projects.filter((el) => el.cause_display_name === causes[filterValue]))}
				</Grid>
			</TabPanel>
		</div>
	)
}