import React, {useState, useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid, Typography, Button} from '@material-ui/core'
import { auth, db, cloudFunctions } from '../../../../Firebase/Firebase';
import {Redirect} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SimpleBackdrop from './SimpleBackdrop';
import { useHistory } from "react-router-dom";


export default function Dialog(props) {

  const [open, setOpen] = useState(false);
  const [stripeFees, setstripeFees] = useState([]);
  let history = useHistory();
  
  useEffect(() => {
    getStripeFees()
}, [])

  function timestampDateConverter(timesTamp) {
    return new Date(timesTamp).toLocaleDateString("en-us");
}

const getStripeFees = event => {
  const stripeFees = cloudFunctions.httpsCallable('getStripeChargeInfo');

  stripeFees().then((result) => {
      setstripeFees(result.data);
    }).catch((error) => {
      console.log(`error: ${JSON.stringify(error)}`);
  });
}

const makeDonation = (params) => {
    setOpen(true)
    const donation = cloudFunctions.httpsCallable('donate')

    donation(params)
    .then((result) => {
      if(result.data["status"]==200){
          setOpen(false)
          history.push({
            pathname : '/thanks',
            state :{
            project_description : props.projectDescription,
            total_amount_donated: parseFloat(props.donate_amount) + parseFloat(props.params["amount"]),
            total_fund_needed: props.totalAmount
            }})
      }else if(result.data["status"]==400){
          alert("Error "+ result.data.message)
          setOpen(false)
      }
      }).catch((error) => {
        console.log(`error==: ${JSON.stringify(error)}`);
        setOpen(false)
    });
}

async function donate(params){
    console.log(params)
    if(props.isPaymentMethodSelected && typeof params["pm_token"] !== 'undefined'){
    if(params["pm_token"].length <= 0){
      alert("Please add or select a card.")
    } else if(params["amount"] < props.stripeFees["min_transaction_amount"]){
      alert("Donation amount cannot be less than $", props.stripeFees["min_transaction_amount"])
    }
    else{
      makeDonation(params)
    }
   } else{
     alert('Please select a card')
   } 
  }

  return (
    open? <SimpleBackdrop open={open} />
    :<>
    <FormControl component="fieldset">
      <RadioGroup defaultValue="no" aria-label="choice" onChange={(e)=>{
        let isPaying = e.target.value=="yes"? true : false
        props.getTotalDonationWithStripeFees(isPaying, props.selectedAmount)
      }} >
        <FormControlLabel 
          value="yes" 
          control={<Radio color="primary"/>} 
          label="Sure, I'll take care of it." 
        />
        <FormControlLabel 
          value="no" 
          control={<Radio color="primary"/>} 
          label="No, not at this time." />
      </RadioGroup>
    </FormControl>
    <Grid container justify="flex-end" style={{padding: '30px 40px 10px 40px'}}>
      <Grid item>
        <Button
          style={{
            textTransform: "capitalize", 
            variant: "contained",
            backgroundColor: "#0133C0",
            borderRadius: '5px',
            color: "#fff",
            width: '200px',
            fontSize: '18px'}}
            onClick={()=> donate(props.params)}
          >
            Donate {'$'+props.totalDonation}
        </Button>
      </Grid>         
    </Grid>
    <div style={{padding: '10px'}} />
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={12}>
        <Typography>${props.donate_amount.toFixed(2)} of ${props.totalAmount} raised</Typography>
      </Grid>
               
      <div style={{padding: '20px'}} />
    </Grid>
    </>
  );
}
