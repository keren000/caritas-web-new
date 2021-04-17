import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import handleDelete from './ProfileCard'

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
			fullWidth={true}
			maxWidth="xs"
			open={props.open}
			onClose={props.close}
			aria-labelledby="max-width-dialog-title"
		>
			 <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this card?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            No
          </Button>
          <Button onClick={props.deletePaymentMethod} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
    </Dialog>
  );
}
