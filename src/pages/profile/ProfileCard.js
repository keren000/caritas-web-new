import React, {useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Button, TextField } from '@material-ui/core';
import { auth, db, cloudFunctions } from '../../Firebase/Firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog';
import SimpleBackdrop from '../projects/my_projects/details/SimpleBackdrop';

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


function ProfileCard(props) {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [defaultCardNumber, setDefaultCardNumber] = useState('');
    const userUID = auth().currentUser.uid
    const [selectedAmount, setSelectedAmount] = useState("$25.0");
    const [selectedCard, setSelectedCard] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState(0);
    const [anonymous, setAnonymous] = useState(false);
    const [stripeFees, setstripeFees] = useState([]);
    const [stripeFeesPerAmount, setStripeFeesPerAmount] = useState(0);
    const [params, setParams] = useState();
    const [cardParams, setCardParams] = useState();
    const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
    const [totalDonation, setTotalDonation] = useState("25.00");
    const [isPayingFees, setIsPayingFees] = useState(false);
    


    useEffect(() => {
      getUserCard(userUID)
      getStripeFees()
      getTotalStripeFee("$25.0")
  }, [])

  const handleClose = () => {
    setOpen(false);
 }

 const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
}

 
//   const handleAdd = () => {
//     setOpen(true);
//     setFormMode(true);
//   }

  const  handleEditCard = () => {

  }

  const getStripeFees = event => {
    const _stripeFees = cloudFunctions.httpsCallable('getStripeChargeInfo');
    
    _stripeFees().then((result) => {
        setstripeFees(result.data);
        _params["stripe_charge_id"] = result.data.id
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
    // console.log('PARAMS============ ', params)
  }

  function getSelectedAmount(e) {
    e.preventDefault()
    let amount = e.target.value
    setSelectedAmount(amount)
    getTotalDonationWithStripeFees(isPayingFees, amount)
    _params["amount"] = e.target.value.toString().substr(1)
    setParams(_params)
    getTotalStripeFee(e.target.value)
  }

  let _params = {
    "user_id": userUID,
    "amount": selectedAmount.toString().substr(1),
    "pm_token": selectedCard["id"],
    "frequency": selectedFrequency,
    "anonymous": anonymous,
    "timestamp": Date.now(),
    "paying_stripe_fee": false,
    "stripe_charge_id": stripeFees["id"],
    "save_card_for_future": false
  }

  function handleRemove(index) {
    console.log(index);
    // remove item
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = index => {
    const values = [...cards];
    const despiteValue = values.splice(index, 1);
    console.log(despiteValue[0].id)

    const _params = {
      "user_id": userUID,
      "pm_token": despiteValue[0].id
    }

    setCardParams(_params)

    setOpen(true)

    // deletePaymentMethod(params)

  }

  const deletePaymentMethod = (params) => {
    
    setOpen(false)
    setOpenBackDrop(true)
    const deleteMethod = cloudFunctions.httpsCallable('deletePaymentMethod')

    deleteMethod(params)
    .then((result) => {
      if(result.data["status"]==200){
          alert('Card deleted with success')
      }else if(result.data["status"]==400){
          alert("Error "+ result.data.message)
      }
      }).catch((error) => {
        console.log(`error==: ${JSON.stringify(error)}`);
    });
    setOpenBackDrop(false)
    getUserCard(userUID)
}

//   setQuestions((questions) => questions.filter((q) => q.id !== id));

  const cardComponents = cards.map((card, index) => (
    <div style={{padding: '6px'}} key={index}>
            <div variant="outlined" color="primary" style={{width: '500px', justifyContent: "flex-start", textTransform: "capitalize"}}>
                <TextField disabled control={<StyledRadio />} label={"**** **** **** "+card["last4"]} />
                <Button style={{backgroundColor: '#fff'}}>
                    <DeleteIcon 
                        // onClick={handleAdd}
                        onClick={() => handleDelete(index)}
                        style={{
                            textTransform: 'capitalize', 
                            color: '#FF0000', 
                            marginTop: '20px',
                            }}
                   />
                </Button>
                
            </div>
            <DeleteDialog 
                open={open} 
                close={handleClose}
                formmode={formMode}
                deletePaymentMethod={()=>deletePaymentMethod(cardParams)}
             />
    </div>
))



function getTotalDonationWithStripeFees(isPayingFees, amount) {
  setIsPayingFees(isPayingFees)
  console.log("IS PAYING FEES------------------------ ", isPayingFees)
  const _am = selectedAmount.toString().substr(1)
  const _part1 = (parseFloat(_am) + parseFloat(stripeFees["stripe_fee_fixed"]))
  const _part2 = (1 - parseFloat(stripeFees["stripe_fee_percentage"])/100)
  const _amount = (_part1/_part2)
  params["amount"] = _amount.toFixed(2)
  let total = isPayingFees? _amount.toFixed(2) : parseFloat(_am).toFixed(2)
  // console.log("TOTAL DONATION---------------- ", total)
  setTotalDonation(total)
  // return totalDonation
  // getTotalStripeFee(_am)
}

  return (
    openBackDrop? <SimpleBackdrop open={openBackDrop} />
  : <>
    <RadioGroup key={defaultCardNumber} defaultValue={"**** **** **** "+defaultCardNumber? "**** **** **** "+defaultCardNumber : " "}aria-label="donation" name="customized-radios" onChange={getSelectedCard} >
        {cardComponents}
    </RadioGroup> 
  </>
  );
}

export default ProfileCard