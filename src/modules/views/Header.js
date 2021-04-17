import React from "react"
import { Paper, Typography} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { CardMedia } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Title from "./Title"

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "hidden",
		flexGrow: 1,
		marginTop: "20px",
		height: "75vh",
		backgroundColor: '#FFF'
	},
	menuButton: {
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	header: {
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	media: {
		width: "720px",
		height: "520px",
	},
	typography: {
		marginLeft: "15px",
		[theme.breakpoints.down("sm")]: {
			marginLeft: "13px",
		},
	},
	box: {
		textAlign: "center",
		marginTop: "65px",
		// [theme.breakpoints.down("xs")]: {
		// 	width: "380px",
		// 	marginLeft: "1%",
		// },
		[theme.breakpoints.up("md")]: {
			marginLeft: "25%",
			width: "600px",
		},
		// [theme.breakpoints.only("sm")]: {
		// 	marginLeft: "33%",
		// 	width: "600px",
		// },
	},
}))
const Header = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Grid container>
						<Grid item>
							<Paper
								elevation={0}
								style={{ background: "transparent" }}
								className={classes.header}
							>
								<Grid container>
									<Grid container xs={4}>
										<IconButton
											className={classes.menuButton}
											color="inherit"
											aria-label="open drawer"
											disableRipple
											disabled
										>
											<CardMedia
												className={classes.media}
											// 	image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fthis.png?alt=media&token=86dc8897-5882-460b-ba7c-d1e3bc4712ea"
											//    />
											   image="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fkkeny%20%5BRecovered%5D-01.png?alt=media&token=2db8aaca-11a0-4144-879d-3b832a3f969b"/>
										</IconButton>
									</Grid>
									<Grid container xs={1}>
										<Typography
											className={classes.typography}
											style={{
												marginTop: "89px",
												fontSize: "43px",
												color: "#2057C0",
												fontWeight: "bold",
												padding: "5px",
											}}
										>
											IS
										</Typography>
									</Grid>
									<Grid container xs={7}>
										<Typography
											style={{
												marginTop: "95px",
												color: "#2057C0",
												fontSize: "30px",
												padding: "10px",
												marginLeft: "10px",
											}}
										>
											how charity needs to be done
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Paper className={classes.box} elevation={0}>
				<Title />
			</Paper>
		</div>
	)
}
export default Header