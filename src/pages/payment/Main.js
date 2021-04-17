import React, { useState, useEffect } from 'react';
import CreditCards from './CreditCards'
import 'react-credit-cards/es/styles-compiled.css';
import {Grid, Typography,  TextField,  Paper, Button, makeStyles, CssBaseline} from '@material-ui/core';
import { auth, db } from "../../Firebase/Firebase"
import AddCard from '../payment/Form/addcreditCard'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const useStyles = makeStyles((theme) => ({
    credit: {
        
    }
}))

function Main(props) {
    const classes = useStyles();
const stripePromise = loadStripe('pk_live_Nic47fewQySP2YIUPIKM4JnO00UiCRcbIE');

  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);

  const [card, setCard] = useState([]);
  const userUID = auth().currentUser.uid


  useEffect(() => {
    getUserCard(userUID)
}, [])


const handleClose = () => {
    setOpen(false);
}

const handleAdd = () => {
  setOpen(true);
  setFormMode(true);
}

async function getUserCard(userUID){
    var items = []
    const cardRef = await db.collection("users"+"/"+userUID+"/"+"cards")
                .get()

    cardRef.forEach((card)=>{
        items.push(card.data())
    })

    setCard(items)
}



const cardComponents = card.map((card, index) => (
    <Grid container justify="center">
        <Grid item >
            <CreditCards handleClose={()=> handleClose()} index={index} card={card} />
        </Grid>
    </Grid>
))

return (
    <Grid container spacing={2}>
        <Elements stripe={stripePromise}>
            <AddCard close={props.close} paymentId={props.paymentId} handleNewCard={props.handleNewCard} addCardWIthoutSaving={props.addCardWIthoutSaving} />
        </Elements>
           <div style={{padding: '10px'}}/>
            {cardComponents}
    </Grid>
  );
  
}

export default Main;