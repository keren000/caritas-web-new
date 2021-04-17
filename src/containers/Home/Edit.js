import React,{useState, useEffect} from 'react'
import MainForm from '../../modules/views/MainForm'
import {Button, Box, Container,  Grid, Typography, withStyles, Paper, Slider, TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { auth, db, cloudFunctions } from '../../Firebase/Firebase';
import { useHistory } from "react-router-dom";
import SimpleBackdrop from '../../pages/projects/my_projects/details/SimpleBackdrop';
import { TrendingUpRounded } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
      },
      nav:{
        display: 'flex',
            [theme.breakpoints.down('xs')]: {
              display: 'none',
            },
      },
      button:{
        color: "#0133C0",
            "&:hover":{
          color: "#214DC5",
            },
        fontSize: 16,
        textTransform: 'capitalize',
        marginLeft: theme.spacing(12),
        backgroundColor: 'none',
        [theme.breakpoints.down("xs")]: {
          fontSize: '15px',
          paddingRight:'40px'
          },
      },
      margin: {
        margin: theme.spacing(1),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

function Edit(props) {
    const { classes } = props;
    const [values, setValues] = useState({
        amount: props.location.state.project_data.recurrent_date.amount_in_dollars,
      });
      const [frequency, setFrequency] = useState(props.location.state.project_data.recurrent_date.frequency);
      const [anonymous, setAnonymous] = useState(props.location.state.project_data.recurrent_date.anonymous);
      const [open, setOpen] = useState(false);
      const [_open, set_Open] = useState(false);
      const refUsersPaymentMethods = db.collection("users")
      const refRecurrentDonation = db.collection("recurrent_donations")
      const [paymentMethodSelected, setPaymentMethodSelected] = useState(props.location.state.project_data.recurrent_date.payment_method);
      const [paymentMethodList, setPaymentMethodList] = useState([]);
      const [stripeFees, setstripeFees] = useState([]);
      const [payStripeFees, setPayStripeFees] = useState(false);
      const [backdropOpen, setBackdropOpen] = useState(false);
      const [stripeFeesPerAmount, setStripeFeesPerAmount] = useState(0);
      let history = useHistory();

      const getStripeFees = event => {
        const _stripeFees = cloudFunctions.httpsCallable('getStripeChargeInfo');
        
        _stripeFees().then((result) => {
          console.log('STRIPE FEES---------------- ', result.data)
            setstripeFees(result.data);
            params["stripe_charge_id"] = result.data.id
          }).catch((error) => {
            console.log(`error: ${JSON.stringify(error)}`);
        });
    }
      useEffect(() => {
		getUsersPaymentMethods(auth().currentUser.uid)
        getStripeFees()
		// eslint-disable-next-line
	},[])

      const handleChange = (event) => {
        setFrequency(event.target.value);
      };
    
      const _handleChange = (event) => {
        setPaymentMethodSelected(event.target.value)
      };

      const handleClose = () => {
        setOpen(false);
      };

      const _handleClose = () => {
        set_Open(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
      const _handleOpen = () => {
        set_Open(true);
      };

      function timestampDateConverter(timesTamp) {
        const date = timesTamp.toDate()
        const day = date.getDay()
        const month = date.getMonth()
        const year = `${date.getFullYear()}`.substr(2)
    
        return `${day}/${month + 1}/${year}`;
    }

    function getTotalStripeFee() {
        const _part1 = (parseFloat(values.amount) + parseFloat(stripeFees["stripe_fee_fixed"]))
        const _part2 = (1 - parseFloat(stripeFees["stripe_fee_percentage"])/100)
        const _amount = (_part1/_part2)
        const _stripeFee = _amount - values.amount
        console.log('STRIPE FEE-------------------- ', _stripeFee.toFixed(2))
        setStripeFeesPerAmount(_stripeFee.toFixed(2))
      }

      function getFinalDonationTotal(isPaying) {
          let amount = parseFloat(values.amount)
          let total = 0.00
          getTotalStripeFee()
          if(isPaying){
              total = amount + stripeFeesPerAmount
          }else{
              total = amount
          }
          console.log('TOTAL------------------ ', total)
          return total
      }

    const getUsersPaymentMethods = async(userUid) =>{
		return refUsersPaymentMethods.doc(auth().currentUser.uid).collection('cards')
		.get()
			.then((paymentDoc) => {
                let items =[]
				paymentDoc.forEach((doc)=>{
                    let data = doc.data()
                    items.push(data)
                })
                setPaymentMethodList(items)
			})
	}

    const deleteRecurrentDonation = async() =>{
		return refRecurrentDonation.doc(props.location.state.project_data.recurrent_date.id)
		.update({
            "status":0
        })
			.then((result) => {
                console.log('RESULT------------ ', result)
			})
	}

    let params ={
        "user_id": auth().currentUser.uid,
        "project_id": props.location.state.project_data.project_id,
        "recurrence_id": props.location.state.project_data.recurrent_date.id,
        "amount": values.amount,
        "pm_token": paymentMethodSelected,
        "frequency": frequency,
        "anonymous": anonymous,
        "timestamp": Date.now(),
        "paying_stripe_fee": payStripeFees,
        "stripe_charge_id": stripeFees["id"],
        "save_card_for_future": false
    }


    const updateDonationRecurrence = (params) => {
        setBackdropOpen(TrendingUpRounded)
        const updateDonation = cloudFunctions.httpsCallable('updateRecurringDonation')
    
        updateDonation(params)
        .then((result) => {
          if(result.data["status"]==200){
              setBackdropOpen(false)
              history.push('/my-projects')
          }else if(result.data["status"]==400){
              alert("Error========>>"+ result.data.message)
              setBackdropOpen(false)
          }
          }).catch((error) => {
            console.log(`error==: ${JSON.stringify(error)}`);
            setBackdropOpen(false)
        });
    }

    const menuItemsComponents = paymentMethodList.map((payment,index)=>(
        <MenuItem value={payment.id}>{"****_****_****_"+payment.last4}</MenuItem>
    ))
    
    return (
        backdropOpen? <SimpleBackdrop open={backdropOpen} />
    : <div className={classes.root}>
            <MainForm>
                <Grid container justify="space-around">
                    <Grid item>{props.location.state.project_data.project_name}</Grid>
                    <Grid item className={classes.nav}>
                        <Button style={{backgroundColor: '#2257c0', color: '#fff'}} className={classes.button} onClick={()=> updateDonationRecurrence(params)} >Edit recurrent donation</Button>
                    </Grid>
                </Grid>
                <div style={{padding: '20px'}}/>
                <Typography>Your next donation is on {timestampDateConverter(props.location.state.project_data.recurrent_date.next_donation_date)}</Typography>
                <div style={{padding: '20px'}}/>
                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Donation amount</Typography>
                <TextField
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                    value={"$"+values.amount}/>
                 <div style={{padding: '10px'}}/>
                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Frequency</Typography>
                <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={frequency}
                        onChange={handleChange}>
                    <MenuItem value={7}>Every Week</MenuItem>
                    <MenuItem value={30}>Every Month</MenuItem>
                </Select>
            </FormControl>
            <div style={{padding: '10px'}}/>
                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Anonymous donation ?</Typography>
                <FormControl component="fieldset">
                    <RadioGroup defaultValue={props.location.state.project_data.recurrent_date.anonymous? "yes": "no"} aria-label="choice" >
                        <FormControlLabel 
                            value="yes" 
                            control={<Radio color="primary"/>} 
                            label="Yes" 
                        />
                        <FormControlLabel 
                            value="no" 
                            control={<Radio color="primary"/>} 
                            label="No" />
                    </RadioGroup>
                </FormControl>
                <div style={{padding: '10px'}}/>
                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Payment details</Typography>
                <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <Select
                        labelId="demo-controlled-open-select-label-pay"
                        id="demo-controlled-open-select-pay"
                        open={_open}
                        onClose={_handleClose}
                        onOpen={_handleOpen}
                        value={paymentMethodSelected}
                        onChange={_handleChange}>
                    {menuItemsComponents}
                </Select>
            </FormControl>
                <div style={{padding: '10px'}}/>
                <Grid item container>
                    <Typography style={{fontSize: '16px', textOverflow: "ellipsis", width: '30rem'}}>Stripe, our payment provider, charges a transaction fee of $1.06 for this donation. Would you like to add this to your donation?</Typography>
                </Grid>
                <div style={{padding: '10px'}}/>
                <FormControl component="fieldset">
                    <RadioGroup defaultValue={props.location.state.project_data.recurrent_date.paying_stripe_fee? "yes":"no"} aria-label="choice" onChange={(e)=> e.target.value == "yes"? setValues(getFinalDonationTotal(true)): setValues(getFinalDonationTotal(false))} >
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
                <div style={{padding: '10px'}}/>
                <Button 
                    style={{
                        backgroundColor: 'red', 
                        color: '#fff',
                        fontSize: 16,
                        textTransform: 'capitalize',}}
                        onClick={()=> deleteRecurrentDonation()}
                        >
                            Delete
                </Button>
            </MainForm>
        </div>
    )
}

export default withStyles(styles)(Edit);