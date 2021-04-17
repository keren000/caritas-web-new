import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import {Button, Paper} from "@material-ui/core"
import {db} from '../../Firebase/Firebase'
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
// Firebase Integration
import { auth } from '../../Firebase/Firebase'
import * as actions from '../../store/actions';
import { FormWrapper, StyledForm } from '../../hoc/layout/elements';
import Message from '../../components/UI/Message/Message';
import { Autocomplete } from "@material-ui/lab";
import Input from '../../components/UI/Forms/Input/Input';
import * as Yup from 'yup';
// import Button from '../../components/UI/Forms/Button/Button';
import styled from 'styled-components';
import Textfield from '../../containers/Auth/SignUp/Textfield'
import Select from '../../containers/Auth/SignUp/Select'
import countries from '../../containers/Auth/SignUp/exports.json';
import cardComponents from '../projects/my_projects/details/Donation'
import ProfileCard from './ProfileCard'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    marginLeft: theme.spacing(5),
    padding: theme.spacing(3),
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  image: {
    marginLeft: theme.spacing(10),
    padding: theme.spacing(2),
  },
  field: {
    '& label.Mui-focused': {
      color: '#0133C0',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0133C0',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0133C0',
      },
      '&:hover fieldset': {
        borderColor: '#0133C0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0133C0',
      },
    },
  },
  submit: {
   width: '200px',
   fontWeight: 'bold',
    backgroundColor: "#0133C0",
    color: '#FFF',
    "&:hover":{
      backgroundColor: "#214DC5"
    },
  },
  save: {
    width: '50px',
    backgroundColor: "#0133C0",
    color: '#FFF',
    "&:hover":{
      backgroundColor: "#214DC5"
    },
  },
 button: {
  fontSize: 18,
  textTransform: 'capitalize',
  color: "#0133C0",
  "&:hover":{
      color: "#214DC5",
      backgroundColor: '#FFF'
  },
  marginRight: theme.spacing(3),
  fontWeight: 'bold'
},
typography2: {
  fontWeight: 'bold',
  fontSize: '18px',
  marginLeft: theme.spacing(3),
  padding: theme.spacing(1)
},
container: {
  marginLeft: theme.spacing(4),
},
paper: {
  marginTop: theme.spacing(5),
  overflow: 'hidden'
},
content: {
  marginTop: '-50px'
},
content1: {
  [theme.breakpoints.only("xs")]: {
    marginTop: "-50px",
  },
},
title1: {
  [theme.breakpoints.only("xl")]: {
    marginTop: '120px'
   },
  [theme.breakpoints.only("xs")]: {
   paddingRight: '120px'
  },
  [theme.breakpoints.only("sm")]: {
    paddingRight: '120px'
   },
}
}));

const MessageWrapper = styled.div`
position: relative;
bottom: 2rem;
width: 100%;
padding: 0 3rem;
`;

const DeleteWrapper = styled.div`
cursor: pointer;
color: var(--color-errorRed);
font-size: 1.3rem;
font-weight: 700;
margin-top: 2rem;
transition: all 0.2s;
&:hover {
transform: translateY(-3px);
}
&:active {
transform: translateY(2px);
}
`;

const ButtonsWrapper = styled.div`
display: flex;
width: 100%;
margin-bottom: 2rem;
justify-content: space-around;
`;



const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('Required.')
  .min(3, 'Too short.')
  .max(25, 'Too long.'),
  lastName: Yup.string()
  .required('Required.')
  .min(3, 'Too short.')
  .max(25, 'Too long.'),
  email: Yup.string()
  .email('Invalid email.')
  .required('The email is required.'),
  password: Yup.string()
  .matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Create a strong password!"
  ),
  confirmPassword: Yup.string()
  .when('password', {
  is: password => password?.length > 0,
  then: Yup.string()
  .required('Confirm password.')
  .oneOf([Yup.ref('password'), null], `Password doesn't match`),
  }),
  country: Yup.string(),
  // .required('Required'),
  phone_number: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    // .required('Required'),
  });


const Profile = ({
  firebase,
  editProfile,
  loading,
  error,
  cleanUp,
  }) => {
  useEffect(() => {
  return () => {
  cleanUp();
  };
  }, [cleanUp]);
  const classes = useStyles();
  const [values, setFieldValue] = React.useState('')
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const user = auth().currentUser
  const [modalOpened, setModalOpened] = useState(false);
  
  if (!firebase.profile.isLoaded) return null;
  
    
  return (
    <React.Fragment>
  
        <div>
        <Grid container justify="center">
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper}>
          <Grid container justify="center">
          <Grid item className={classes.title1}>
            <h2>Profile settings</h2>
              <Typography style={{fontFamily: 'Mulish', fontSize: '18px'}}>
                  Change your profile settings here
               </Typography>
          </Grid>
          {/* <Grid item><img alt="profile" src="https://firebasestorage.googleapis.com/v0/b/caritas-revolution-438c3.appspot.com/o/images%2FLandingPage%2Fprofile.png?alt=media&token=4420532c-334a-4ee2-9235-5724467b961d" width='300'/></Grid> */}
          </Grid>

          <Grid container>
            <Grid item xs={12}>
            <div style={{padding: '20px'}} />
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
            >
            <Tab label="My Profile" {...a11yProps(0)} style={{textTransform: 'capitalize'}}/>
            <Tab label="Payment Methods" {...a11yProps(1)} style={{textTransform: 'capitalize'}}/>
           </Tabs>
           <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
           >
             <TabPanel value={value} index={0} dir={theme.direction}>
        <Formik
          initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          phone_number: firebase.profile.phone_number,
          // addressLine1: firebase.profile.addressLine1,
          // addressLine2: firebase.profile.addressLine2,
          // city: firebase.profile.city,
          // state: firebase.profile.state,
          country: firebase.profile.country,
          email: firebase.auth.email,
          password: '',
          confirmPassword: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // edit the profile here
            await editProfile(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                   <Grid item xs={12}>
                     <Typography><strong>Login as:</strong>&nbsp;{user.email}</Typography>
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     {/* <Field
                        className={classes.contente}
                        type="text"
                        name="firstName"
                        label="First Name"
                        component={Input}
                      /> */}
                      <Textfield
                       name="firstName"
                       label="First Name"
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     {/* <Field
                        className={classes.content1}
                        type="text"
                        name="lastName"
                        label="Last Name"
                        component={Input}
                      /> */}
                       <Textfield
                       name="lastName"
                       label="Last Name"
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     {/* <Field
                        className={classes.content}
                        type="text"
                        name="phone"
                        label="Phone Number"
                        component={Input}
                      /> */}
                      <Textfield
                       name="phone_number"
                       label="Phone"
                     />
                       {/* <MuiPhoneNumber className={classes.content} defaultCountry={'us'} variant="outlined" name='phone'/> */}
                   </Grid>
                   
                  
                   <Grid item xs={12} sm={6}>
                     <Select
                       name="country"
                       label="Country"
                       options={countries}
                     />
                   </Grid>
                   {/* <Grid item xs={12} sm={6}>
                   <Textfield
                       name="password"
                       label="Password"
                       type="password"
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                   <Textfield
                       name="confirmPassword"
                       label="Confirm Password"
                       type="password"
                     />
                  </Grid> */}

                  <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button
                      className={classes.submit}
                      disabled={!isValid || isSubmitting}
                      loading={loading ? 'Editing...' : null}
                      type="submit"
                  >
                    Save
                  </Button>
                  </Grid>
                  <div style={{padding: '10px'}}/>
                  <MessageWrapper>
                    <Message error show={error}>
                      {error}
                    </Message>
                  </MessageWrapper>
                  <MessageWrapper>
                    <Message success show={error === false}>
                      Profile was updated!
                    </Message>
                  </MessageWrapper>
              </Grid>
            </Form>
          )}
        </Formik>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <form className={classes.form}>
              <Grid container spacing={2}>
                   <Grid item xs={12}>
                     <Typography><strong>Current Card</strong></Typography>
                   </Grid>
                   <Grid item xs={12}>
                    <ProfileCard />
                   </Grid>
                   
              </Grid>
              
        </form>
        </TabPanel>
      </SwipeableViews>
      
            </Grid>
          </Grid>
          </Paper>
        </Grid>
        </Grid>
      
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  });
  
  const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  };
  
  export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Profile);
  