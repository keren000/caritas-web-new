import React from "react"
import {
	Box,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

const styles = (theme) => ({
	root: {
		width: "100%",
		maxWidth: 500,
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.only("xl")]: {
			marginTop: theme.spacing(60),
		   },
	},
})

function TransacHistory(props) {
	const { classes, contribution } = props
	const { amount, project_name, created_at } = contribution
	const date = created_at.toDate()
	const day = date.getDay()
	const month = date.getMonth()
	const year = `${date.getFullYear()}`.substr(2)

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<Box mt={7} mb={12}>
					<Paper className={classes.paper}>
						<List
							component="nav"
							className={classes.root}
							aria-label="transaction list"
						>
							<ListItem>
								<ListItemText>
									<Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
										{project_name}
									</Typography>
									<Typography>
										${amount}.0 on {`${day}/${month + 1}/${year}`}
									</Typography>
								</ListItemText>
							</ListItem>
							<Divider />
						</List>
					</Paper>
				</Box>
			</Container>
		</div>
	)
}

export default withStyles(styles)(TransacHistory)
