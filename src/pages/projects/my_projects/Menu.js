import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Favorite from "./Favorite"
import Contributed from "./Contributed"
import All from "./All";

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
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
		[theme.breakpoints.only("xl")]: {
			marginTop: theme.spacing(60),
		   },
	},
}))

export default function Menu() {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<AppBar
				position="static"
				style={{ color: "#FAFAFA", backgroundColor: "#fff" }}
				elevation={0}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
					// centered
				>
					<Tab
						label="All"
						{...a11yProps(0)}
						style={{ textTransform: "capitalize", fontSize: "16px" }}
					/>
					<Tab
						label="Favorite"
						{...a11yProps(1)}
						style={{ textTransform: "capitalize", fontSize: "16px" }}
					/>
					<Tab
						label="Contributed"
						{...a11yProps(2)}
						style={{ textTransform: "capitalize", fontSize: "16px" }}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<All/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Favorite />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Contributed />
			</TabPanel>
		</div>
	)
}