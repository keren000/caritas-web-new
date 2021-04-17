import React from 'react'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Grid,
	Input,
} from "@material-ui/core"

function EditCard(props) {
    return (
        <Dialog
			fullWidth={true}
			maxWidth="sm"
			open={props.open}
			onClose={props.close}
			aria-labelledby="max-width-dialog-title"
		>
			<DialogTitle>Update Card Content</DialogTitle>
        </Dialog>
    )
}

export default EditCard
