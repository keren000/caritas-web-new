import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import {Button, Typography} from '@material-ui/core'
import { makeStyles, Grid } from '@material-ui/core';
import IsPayingDialog from "./IsPayingDialog";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth, db, cloudFunctions } from '../../../Firebase/Firebase';
import SimpleBackdrop from "../../projects/my_projects/details/SimpleBackdrop";

const useStyles = makeStyles((theme) => ({
  save: {
    fontWeight: 'bold',
    width: '150px',
    fontSize: 16,
    textTransform: 'capitalize',
    backgroundColor: '#2057C0',
    color: '#fff',
    "&:hover":{
      backgroundColor: "#214DC5"
    },
  },
  form: {
    width: '500px'
  },
  fieldset: {
    height: '50px'
  }
}));
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#C4F0FF",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#FCE883" },
      "::placeholder": { color: "#87BBFD" }
    },
    invalid: {
      iconColor: "red",
      color: "red"
    }
  }
}
export default function AddCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [success, setSuccess ] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const stripe = useStripe()
    const elements = useElements()

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSaveCard = async (e) => {
        e.preventDefault()
        setOpenBackdrop(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        try {
            setOpenBackdrop(true)
            const {id} = paymentMethod
            if(id != null){
              const params = {
                "user_id": auth().currentUser.uid,
                "token": paymentMethod.id
              }
            const addPaymentMethod = cloudFunctions.httpsCallable('addPaymentMethodToUser')
            addPaymentMethod(params)
            .then((result) => {
              if(result.data["status"]==200){
                setOpen(false)
                setOpenBackdrop(false)
                props.handleNewCard()
                props.close()
              }
              }).catch((error) => {
                setOpen(false)
                setOpenBackdrop(false)
                console.log(`error==: ${JSON.stringify(error)}`);
            });
            }
        } catch (error) {
            console.log("Error", error)
            setOpenBackdrop(false)
        }
    } else {
        console.log(error.message)
    }
}

const handleDonationWithoutSavingCard = async (e) => {
  e.preventDefault()
  setOpenBackdrop(true)
  setOpen(true)
  const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
  })
if(!error) {
  try {
      const {id} = paymentMethod
      if(id != null){
      const card = paymentMethod.card
      card["id"]= paymentMethod.id
      props.addCardWIthoutSaving(paymentMethod.card)
        const params = {
          "user_id": auth().currentUser.uid,
          "token": paymentMethod.id
        }
        setOpenBackdrop(false)
        setOpen(false)
        props.close()
      }
  } catch (error) {
      console.log("Error", error)
      setOpenBackdrop(false)
      setOpen(false)
      props.close()
  }
} else {
  console.log(error.message)
}
}
    return (
<>
      <form className={classes.form}>
      {open && <SimpleBackdrop open={openBackdrop} />}
      <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>Payment Form</Typography>
      <div style={{padding: '10px'}}/>
            <fieldset className={classes.fieldset}>
                  <Grid xs={12}>
                    <div style={{padding: '5px'}}/>
                    <CardElement options={CARD_OPTIONS}/></Grid>
            </fieldset>
            <div style={{padding: '10px'}}/>
            <Grid container justify="center">
              <Grid item >
            <Button  className={classes.save} onClick={handleClickOpen}>
                Add card
            </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Caritas Revolution"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you like to save this card for future transaction?
            If you accept card will be saved upon successful processing of donation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDonationWithoutSavingCard} color="primary">
            No
          </Button>
          <Button onClick={handleSaveCard} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
            </Grid>
            </Grid>
        </form>
        </>
    )
}