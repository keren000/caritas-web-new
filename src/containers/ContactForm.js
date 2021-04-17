import {
	Button,
	Container,
	Paper,
	Typography,
	TextField,
	Box,
} from "@material-ui/core"
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { db } from "../Firebase/Firebase"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link style={{ color: "#0133C0" }} to="/">
				Caritas Revolution
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#0133C0",
		color: "#FFF",
		"&:hover": {
			backgroundColor: "#214DC5",
		},
	},
}))

const ContactForm = (props) => {
	const classes = useStyles(props)

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")

	const [loader, setLoader] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoader(true)

		db.collection("contacts")
			.add({
				name: name,
				email: email,
				to: ["contact@caritasrevolution.com"],
				replyTo: email,
				message: {
					subject: `A new message from ${name}`,
					text: message,
				},
			})
			.then(() => {
				setLoader(false)
				alert("Your message has been submitted👍")
			})
			.catch((error) => {
				alert(error.message)
				setLoader(false)
			})

		setName("")
		setEmail("")
		setMessage("")
	}

	return (
		<Container maxWidth="sm" component={Paper}>
			<form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					variant="outlined"
					className={classes.field}
					margin="normal"
					required
					fullWidth
					id="name"
					label="Name"
					name="name"
					autoComplete="name"
					autoFocus
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<TextField
					variant="outlined"
					className={classes.field}
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="nemail"
					autoComplete="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<TextField
					id="outlined-multiline-static"
					label="Message"
					multiline
					rows={4}
					variant="outlined"
					margin="normal"
					required
					fullWidth
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button
					onClick=""
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
				>
					Submit
				</Button>
			</form>
			<Box mt={2}>
				<Copyright />
				<br />
			</Box>
		</Container>
	)
}

export default ContactForm
