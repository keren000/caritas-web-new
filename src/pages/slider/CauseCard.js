import React from "react"
import { Grid, Typography, Box, Paper } from "@material-ui/core"
import { Link } from "react-router-dom"
import VisibilityIcon from "@material-ui/icons/Visibility"

export default function CauseCard(props) {
	const { classes } = props

	return (
		<Paper className={classes.paper} key={props.index}>
			<Grid container spacing={3} alignItems="center" justify="center">
				<Grid item>
					<img
						src={props.cause.icon}
						alt={props.cause.cause_display_name}
						className={classes.imageComponent}
					/>
				</Grid>
				<Grid item xs={10} lg={6} md={5} sm={10}>
					<Box style={{ textAlign: "center" }}>
						<Typography className={classes.typography1} noWrap>
							{props.cause.cause_display_name}
						</Typography>
						<Typography className={classes.count}>
							{props.cause.project_count}{" "}
							{props.cause.project_count > 1 ? "projects" : "project"}{" "}
						</Typography>
					</Box>
				</Grid>
				<Grid item>
					<Link
						to={{
							pathname: "/projects",
							state: {
								causeIndex: props.causeIndex,
							},
						}}
					>
						<VisibilityIcon
							style={{ color: "#0133C0" }}
							className={classes.add}
						/>
					</Link>
				</Grid>
			</Grid>
		</Paper>
	)
}