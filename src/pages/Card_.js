import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"
import IconButton from "@material-ui/core/IconButton"
import {Grid} from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import CardActions from '@material-ui/core/CardActions';
import { auth, db } from "../Firebase/Firebase"
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
	root: {maxWidth: 345,
		boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
	},
	media: {
		height: 160,
	},
	title: {
	},
	donateButton: {
		marginLeft: '60%',
	},
	link:{
		textDecoration: 'none'
	  }
})

let userUID = '';
let projectId = '';
let docId = '';

export default function ProjectsCard(props) {
	const classes = useStyles()
	const [favoriteState, setFavoriteState] = useState(true);
	const [contributedState, setContributedState] = useState(false);
	const refFavotiteProjects = db.collection("favourite_projects");
	const [isFavourite, setisFavourite] = useState(false);
	let history = useHistory();

	async function isUserAlreadyLikeProject(userUID, projectId){
		const favProjects = await db.collection("favourite_projects")
		.where("user_id","==",userUID)
		.where("project_id","==", projectId)
		.get()

		if(favProjects.docs.length >0){
			docId = favProjects.docs[0].id
			setContributedState(favProjects.docs[0].data().contributed)
			return true
		}else{
			return false
	}
	}

	function goTO() {
		if(props.recurrentDate != null){
		history.push({
            pathname : '/edit',
            state :{
				project_data: props.project_data,
            }})
		}else{
		history.push({
			pathname : '/donation',
			state: {
				project_data: props.project_data,
			}})	
		}
	}

	useEffect(() => {
		setisFavourite(props.isFavourite)
		userUID = auth().currentUser.uid;
	  }, []);


	async function handleFavorite(event){
		event.stopPropagation();
		event.preventDefault();

		 	projectId = props.project_data["project_id"]
		setFavoriteState(favoriteState)


		if(await isUserAlreadyLikeProject(userUID, projectId)){
			if(contributedState){
				console.log('YES CONTRIBUTED')
				refFavotiteProjects.doc(docId).update({
					favourite: !favoriteState
				})
			}else{
				refFavotiteProjects.doc(docId).delete().then(function() {
					console.log("Document successfully deleted!");
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			}
		}else{
			refFavotiteProjects.add({
			contributed: contributedState,
			favourite: favoriteState,
			project_id: projectId,
			user_id: userUID
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		}
}

function timestampDateConverter(timesTamp) {
	const date = timesTamp.toDate()
	const day = date.getDay()
	const month = date.getMonth()
	const year = `${date.getFullYear()}`.substr(2)

	return `${day}/${month + 1}/${year}`;
}

return (
			<Card className={classes.root} style={{ marginBottom: 12 }}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
          				image={props.img} title={props.name}
        			/>
        			<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
		  					{props.country} . {props.cause}{" "}
          				</Typography>

		  				<Typography variant="h6" component="h4">
		  					{props.name}
          				</Typography>
          				<Typography variant="body2" color="textSecondary" component="p">
		  					{props.description}
          				</Typography>
        			</CardContent>
      			</CardActionArea>
					{props.recurrentDate? <Typography style={{paddingLeft: '10px'}}>Next Donation on {timestampDateConverter(props.recurrentDate.next_donation_date)}</Typography>: ''}
				<CardActions disableSpacing>
					<Grid container justify="flex-end">
						<IconButton className={classes.donateButton} aria-label="settings" style={{color: isFavourite? 'red' : 'grey'}} onClick={()=> goTO()} >
							<CardActionArea>
								{props.recurrentDate?
								<Button variant="outlined" color="primary">
									Edit
								</Button>
									: 
								<Button variant="outlined" color="primary">
									Donate
								</Button>}
							</CardActionArea>
						</IconButton>
					</Grid>
				</CardActions>
            </Card>
	)
}