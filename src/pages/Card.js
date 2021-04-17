import React, { useState, useEffect, ChangeEvent } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from "@material-ui/icons/Favorite"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import CardActions from "@material-ui/core/CardActions"
import { auth, db } from "../Firebase/Firebase"
import create from 'zustand'
import SimpleBackdrop from "./projects/my_projects/details/SimpleBackdrop"
import { useHistory } from "react-router-dom"


const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	  },
	  media: {
		height: 140,
	  },
	favIcon: {
		marginLeft: '90%',
	},
	link:{
		textDecoration: 'none'
	  }
})

let userUID = '';
let projectId = '';
let docId = '';

const useStore = create(set =>({

	favoriteState: false,

	setFavoriteState: ()=> set(state => ({
		favoriteState: !state.favoriteState
	}))
}))

export default function ProjectsCard(props) {
	const classes = useStyles()
	const favoriteState = useStore(state => state.favoriteState)
	const [contributedState, setContributedState] = useState(false)
	const refFavotiteProjects = db.collection("favourite_projects")
	const setFavoriteState = useStore(state => state.setFavoriteState)
	const [query, setQuery] = useState("");
	const history = useHistory()

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
		setFavoriteState(props.isFavourite)
		userUID = auth().currentUser.uid
	}, [])

	async function handleFavorite(event) {
		event.stopPropagation()
		event.preventDefault()
		
		projectId = props.project_data["project_id"]

		if (await isUserAlreadyLikeProject(userUID, projectId)) {
			if (contributedState) {
				console.log("YES CONTRIBUTED")
				refFavotiteProjects.doc(docId).update({
					favourite: !props.isFavourite,
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
					favourite: true,
					project_id: projectId,
					user_id: userUID,
				})
				.then(function (docRef) {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function (error) {
					console.error("Error adding document: ", error)
				})
		}
		props.handleLike()
	}

	return (
		<Link to={"/details?id="+props.project_data["project_id"]}>
			<Card className={classes.root} style={{marginBottom: '12'}}>
				<CardActionArea >
					<CardMedia
						className={classes.media}
						image={props.img}
						title={props.name}
                    />
                    <CardContent>
						<Typography gutterBottom variant="h6" component="h2">
		  					{props.country} . {props.cause}{" "} 
          				</Typography>
		  				<Typography variant="h5" color="#000" component="p" style={{padding: '12px'}}>
				 			{props.name}
						</Typography>
			
          				<Typography variant="body2" color="textSecondary" component="p">
		  					{props.description}
          				</Typography>
        			</CardContent>
      			</CardActionArea>
      			<CardActions disableSpacing>
					  <Grid container justify="flex-end">
						  <IconButton 
						  	aria-label="add to favorites" 
							onClick={handleFavorite}
							style={{marginTop: '-7px',color: props.isFavourite === true ? "red" : "#ddd"}}>
         					<FavoriteIcon />
        				 </IconButton>
					  </Grid>
        
				</CardActions>
    		</Card>
		</Link>
	)
}
