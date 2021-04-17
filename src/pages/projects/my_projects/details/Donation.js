import { React, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Container, Paper, Grid, Typography, Button,Checkbox, TextField, AppBar, Toolbar } from '@material-ui/core';
import Dialog from './Dialog'
import DonationHead from './DonationHead'
import { auth, db, cloudFunctions } from '../../../../Firebase/Firebase';
import {Link} from 'react-router-dom'
import AddCard from '../../../payment/Form/addcreditCard'
import Payment from '../../../../containers/Home/Payment'
import DonNav from './DonNav'
import DetailsContainer from './DetailsContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  app: {
    backgroundColor: '#FFF'
  },
paper: {
        padding: theme.spacing(4, 3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(3, 4),
        },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));


function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
    //   className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function Donation(props) {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [defaultCardNumber, setDefaultCardNumber] = useState('');
    const userUID = auth().currentUser.uid
    const [projectData, setprojectData] = useState(props.location.state?.project_data)
    const [selectedAmount, setSelectedAmount] = useState("$25.0");
    const [selectedCard, setSelectedCard] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState(0);
    const [anonymous, setAnonymous] = useState(false);
    const [stripeFees, setStripeFees] = useState([]);
    const [stripeFeesPerAmount, setStripeFeesPerAmount] = useState(0);
    const [params, setParams] = useState();
    const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
    const [totalDonation, setTotalDonation] = useState("25.00");
    const [isPayingFees, setIsPayingFees] = useState(false);


    useEffect(() => {
      getStripeFees()
      getUserCard(userUID)
      getTotalStripeFee("$25.0")
  }, [])

  let _params = {
    "user_id": userUID,
    "project_id": projectData["project_id"],
    "project_status": projectData["project_status"],
    "amount": selectedAmount.toString().substr(1),
    "pm_token": selectedCard["id"],
    "frequency": selectedFrequency,
    "anonymous": anonymous,
    "timestamp": Date.now(),
    "paying_stripe_fee": false,
    "stripe_charge_id": stripeFees["stripe_charge_id"],
    "save_card_for_future": false
  }

  const handleClose = () => {
    setOpen(false);
 }
 
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
  }

  const getStripeFees = async event => {
    const _stripeFees = await cloudFunctions.httpsCallable('getStripeChargeInfo');
    
    _stripeFees().then((result) => {
      console.log("************ result data", result.data.stripe_charge_id)
        setStripeFees(result.data);
        _params["stripe_charge_id"] = result.data.stripe_charge_id
        setParams(_params)
        
      }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
    });
    
}

    async function getUserCard(userUID){
      var items = []
      const cardRef = await db.collection("users"+"/"+userUID+"/"+"cards")
                  .get()
  
      cardRef.forEach((card)=>{
          if(card.data()["is_default"] == true){
            const _last4 = card.data()["last4"]? card.data()["last4"] : "0"
            setDefaultCardNumber(_last4)
            _params["pm_token"] = card.data()["id"]
          }
          setParams(_params)
          items.push(card.data())
          setIsPaymentMethodSelected(true)
      })
  
      setCards(items)
  }

function getTotalStripeFee(_donation) {
  const _part1 = (parseFloat(_donation.substr(1)) + parseFloat(stripeFees["stripe_fee_fixed"]))
  const _part2 = (1 - parseFloat(stripeFees["stripe_fee_percentage"])/100)
  const _amount = (_part1/_part2)
  const _stripeFee = _amount - _donation.substr(1)
  setStripeFeesPerAmount(_stripeFee.toFixed(2))
}

  function isAnonymous(e) {
    e.preventDefault()
    setAnonymous(e.target.value)
    console.log("ANONYMOUS", e.target.value)
  }

  function getSelectedFrequency(e) {
    e.preventDefault()
    setSelectedFrequency(parseInt(e.target.value))
    console.log("FREQUENCY", e.target.value)
  }

  function getSelectedCard(e) {
    e.preventDefault()
    setSelectedCard(e.target.value)
    const last_ = e.target.value.substr(e.target.value.length - 4)
    const cardSelectedData = cards.filter(c => c["last4"]==last_)
    for(var i =0; i< cards.length; i++){
      cards[i]["is_default"] = false
    }
    cardSelectedData["is_default"] = false
    _params["pm_token"] = cardSelectedData[0]["id"]
    setParams(_params)
    setIsPaymentMethodSelected(true)
    console.log("Card selected", cardSelectedData)
  }

  function getSelectedAmount(e) {
    e.preventDefault()
    let amount = typeof e.target.value == 'undefined'? selectedAmount : e.target.value
    setSelectedAmount(amount)
    getTotalDonationWithStripeFees(isPayingFees, amount)
    _params["amount"] = e.target.value.toString().substr(1)
    setParams(_params)
    getTotalStripeFee(e.target.value)
  }

  const cardComponents = cards.map((card, index) => (
    <div style={{padding: '6px'}} key={index}>
            <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start", textTransform: "capitalize"}}>
                <FormControlLabel value={"**** **** **** "+card["last4"]} control={<StyledRadio />} label={"**** **** **** "+card["last4"]} />
            </Button>
    </div>
))

function handleCustomAmount(e) {
  e.preventDefault()

  setSelectedAmount(e.target.value)
}

function getTotalDonationWithStripeFees(isPayingFees, amount) {
  setIsPayingFees(isPayingFees)
  let mnt = typeof amount == 'undefined'? selectedAmount : amount
  console.log("AMOUNT------- ", mnt)
  const _am = mnt.toString().startsWith("$")? mnt.toString().substr(1) : mnt.toString()
  const _part1 = (parseFloat(_am) + parseFloat(stripeFees["stripe_fee_fixed"]))
  const _part2 = (1 - parseFloat(stripeFees["stripe_fee_percentage"])/100)
  const _amount = (_part1/_part2)
  params["amount"] = _amount.toFixed(2)
  let total = isPayingFees? _amount.toFixed(2) : parseFloat(_am).toFixed(2)
  setTotalDonation(total)

  console.log("amount----", _am, "part 1--------------", _part1,"part2---------", _part2, "total------", _amount,"TOTAL-------- ", total)
  // return totalDonation
  // getTotalStripeFee(_am)
}

const handleNewCard =()=> {
  getUserCard(userUID)
}

  const addCardWIthoutSaving =(card)=>{
      setCards((cards)=> [...cards, card])
  }

  // console.log("------------------->> ", projectData)
  // console.log("************ result", stripeFees["stripe_fee_percentage"])
  console.log('PARAMS============ ', params)

  return (
  <>
    <DonNav />
    <DetailsContainer>
      <DonationHead stripeFees={stripeFees} params={params} projectName = {projectData["project_name"]} donate_amount={projectData["donated_amount"]} totalAmount = {projectData["project_funding_goal"]["amount"]} selectAmount={selectedAmount} />
         
      <Paper elevation={0}>
              <Paper className={classes.paper} elevation={0}>
                  <FormControl component="fieldset">
                      <Grid container>
                          <Grid item container xs={12}>
                              <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Donate</Typography>
                          </Grid>
                          <div style={{padding: '10px'}} />
                          <Grid item xs={12}>
                              <RadioGroup defaultValue="$25.0" aria-label="donation" name="customized-radios" onChange={getSelectedAmount} >
                                  <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start"}}>
                                      <FormControlLabel value="$25.0" control={<StyledRadio />} label="$25.0" />
                                  </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{ width: '250px', justifyContent: "flex-start"}}>
                                    <FormControlLabel value="$50.0" control={<StyledRadio />} label="$50.0" />
                                </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start"}}>
                                    <FormControlLabel value="$100.0" control={<StyledRadio />} label="$100.0" />
                                </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start"}}>
                                <FormControlLabel 
                                  value={selectedAmount}
                                  control={<StyledRadio />} 
                                  label={
                                  <TextField
                                    id="standard-bare"
                                    defaultValue='$0'
                                    size='small'
                                    InputProps={{ disableUnderline: true }}
                                    onChange={handleCustomAmount}
                                  />
                                }
                               />
                             </Button>
                              </RadioGroup>
                          </Grid>
                        </Grid>
                        <div style={{padding: '15px'}} />
                        <Grid container>
                            <Grid item container xs={12}>
                                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>How often would you like to donate?</Typography>
                            </Grid>
                            <div style={{padding: '10px'}} />
                          <Grid item xs={12}>
                              <RadioGroup defaultValue="0" aria-label="donation" name="customized-radios" onChange={getSelectedFrequency} >
                                  <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start", textTransform: "capitalize"}}>
                                      <FormControlLabel value="0" control={<StyledRadio />} label="Just this once" />
                                  </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{ width: '250px', justifyContent: "flex-start",textTransform: "capitalize"}}>
                                    <FormControlLabel value="7" control={<StyledRadio />} label="Every week" />
                                </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start", textTransform: "capitalize"}}>
                                    <FormControlLabel value="30" control={<StyledRadio />} label="Every month" />
                                </Button>
                              </RadioGroup>
                          </Grid>
                        </Grid>
                        <div style={{padding: '15px'}} />
                        <Grid container>
                            <Grid item container xs={12}>
                                <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Make this donation anonymous?</Typography>
                            </Grid>
                            <div style={{padding: '10px'}} />
                          <Grid item xs={12}>
                              <RadioGroup defaultValue="No" aria-label="donation" name="customized-radios" onChange={isAnonymous} >
                                  <Button variant="outlined" color="primary" style={{width: '250px', justifyContent: "flex-start", textTransform: "capitalize"}}>
                                      <FormControlLabel value="Yes" control={<StyledRadio />} label="Yes" />
                                  </Button>
                                <div style={{padding: '6px'}} />
                                <Button variant="outlined" color="primary" style={{ width: '250px', justifyContent: "flex-start",textTransform: "capitalize"}}>
                                    <FormControlLabel value="No" control={<StyledRadio />} label="No" />
                                </Button>
                              </RadioGroup>
                          </Grid>
                        </Grid>
                    </FormControl>
                    <div style={{padding: '15px'}} />
                    <Grid container>
                        <Grid item container xs={12}>
                            <Typography style={{fontWeight: 'bold', fontSize: '18px'}}>Payment Details</Typography>
                        </Grid>

                        <Grid item xs={12}>
                        <RadioGroup key={defaultCardNumber} defaultValue={"**** **** **** "+defaultCardNumber? "**** **** **** "+defaultCardNumber : " "}aria-label="donation" name="customized-radios" onChange={getSelectedCard} >
                          {cardComponents}
                        </RadioGroup>
                      </Grid>

                        <div style={{padding: '10px'}} />
                          <Grid item xs={12}>
                              <Button variant="outlined" color="primary" style={{textTransform: "capitalize", fontSize: '18px', borderRadius: '5px'}}  onClick={handleAdd}>Use New Card</Button>
                         </Grid>
                         <div style={{padding: '10px'}} />
                         <Grid item container>
                             <Typography style={{fontSize: '16px', textOverflow: "ellipsis", width: '30rem'}}>Stripe, our payment provider, charges a transaction fee of ${stripeFeesPerAmount} for this donation. Would you like to add this to your donation?</Typography>
                         </Grid>
                            <Dialog getTotalDonationWithStripeFees={(isPayingFees, selectedAmount)=> getTotalDonationWithStripeFees(isPayingFees, selectedAmount)} totalDonation={totalDonation} isPaymentMethodSelected={isPaymentMethodSelected} stripeFees={stripeFees} params={params} projectDescription = {projectData["project_description"]} projectName = {projectData["project_name"]} donate_amount={projectData["donated_amount"]} totalAmount = {projectData["project_funding_goal"]["amount"]} selectAmount={selectedAmount} stripeFeePerAmount={stripeFeesPerAmount} />  
                    
                    </Grid>
                    
                </Paper>
            </Paper>
             <Payment
              handleNewCard={handleNewCard}
              open={open}
              close={handleClose}
              formMode={formMode}
              addCardWIthoutSaving={addCardWIthoutSaving}
              />
    </DetailsContainer>
  </>
  );
}

export default Donation