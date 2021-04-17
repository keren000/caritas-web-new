import React, {useEffect} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider
} from '@material-ui/core';
import Textfield from './Textfield';
import Select from './Select';
import styled from 'styled-components';
import MainForm from '../../../modules/views/MainForm'
import Button from '../../../components/UI/Forms/Button/Button';
import countries from './exports.json';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import Message from '../../../components/UI/Message/Message';
import { useHistory } from "react-router-dom";
import firebase from '../../../Firebase/Firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {Link} from 'react-router-dom'
import HeaderBar from '../../../modules/views/HeaderBar'
import {signInWithFacebook, signInWithGoogle} from '../../../Firebase/Firebase'
import InputAdornment from '@material-ui/core/InputAdornment';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link style={{color: '#0133C0'}} to="/">
      Caritas Revolution
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  // addressLine1: '',
  // addressLine2: '',
  // city: '',
  // state: '',
  country: '',
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  password: Yup.string()
    .required("Required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Create a strong password!"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Doesn't match`)
    .required('Confirm password.'),
  country: Yup.string()
    .required('Required'),

});

const SignUp = ({ signUp, loading, error, cleanUp}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const signInWithGoogle = () => {
    firebase
    .login({
    provider: "google",
    type: "popup",
    })
    .then(() => {
    history.push("/home");
    });
    };
    
    // const signInWithFacebook = () => {
    // firebase
    // .login({
    // provider: "facebook",
    // type: "popup",
    // })
    // .then(() => {
    // history.push("/my-profile");
    // });
    // };


  return (
    <Grid container>
      <HeaderBar />
      <Grid item xs={12}>
        <Container maxWidth="sm">
          <div className={classes.formWrapper}>

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              // validationSchema={FORM_VALIDATION}
              // onSubmit={values => {
              //   console.log(values);
              // }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values, { setSubmitting }) => {
              await signUp(values);
              setSubmitting(false);
            }}
            >
              {({ isSubmitting, isValid }) => (
                // <MainForm>
                <>
                 <Form>
                 <div style={{padding: '10px'}} />
                 <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" style={{fontSize: '16px'}}>
          {'Already have an account? '}
            <Link to="/login" underline="always" className={classes.link}>
               Login 
            </Link>
          </Typography>
        </React.Fragment>
        <div style={{padding: '15px'}} />
                 <Grid container spacing={2}>
 
                   <Grid item xs={12} sm={6}>
                     <Textfield
                       name="firstName"
                       label="First Name"
                     />
                   </Grid>
 
                   <Grid item xs={12} sm={6}>
                     <Textfield
                       name="lastName"
                       label="Last Name"
                     />
                   </Grid>
 
                   <Grid item xs={12} sm={6}>
                     <Textfield
                       name="email"
                       label="Email"
                     />
                   </Grid>
 
                   <Grid item xs={12} sm={6}>
                     <Textfield
                       name="phone"
                       label="Phone"
                       placeholder="+1 646 980 4741"
                       InputProps={{
                        startAdornment: <InputAdornment position="start">
                        <Tooltip title="Don't forget to add area code to your phone " arrow><InfoIcon style={{color: '#E0E0E0'}}/>
</Tooltip></InputAdornment>,
                      }}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
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
                   </Grid>
                   <Grid item xs={12}>
                     <Select
                       name="country"
                       label="Country"
                       options={countries}
                     />
                   </Grid>
 
 
                   <Grid item xs={12}>
                   <Button
                      disabled={!isValid || isSubmitting}
                      loading={loading ? 'Signing up...' : null}
                      type="submit"
                      style={{color: '#fff'}}
                   >
                    Sign up
                  </Button>
                  <MessageWrapper>
                    <Message error show={error}>
                    {error}
                    </Message>
                  </MessageWrapper>
                </Grid>
 
 
                 </Grid>
 
               </Form>
               <div style={{padding: '20px'}} />
               <Grid
            container
            alignItems="center"
            justify="center"
            spacing={3}>
              <Grid item lg = {3}><Divider/></Grid>
              <Grid ><Typography textAlign="center">OR</Typography></Grid>
              <Grid item lg = {3}><Divider /></Grid>
        </Grid>
        <div style={{padding: '15px'}} />
        <Grid container spacing={1} justify="center">
          <Grid item >
            <div 
              type="button" 
              fullWidth 
              variant="contained" 
              onClick = {signInWithFacebook}
              style={{color: '#4267B2'}}>
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </div>
         </Grid>
         <Grid item>
           <div 
            type="button" 
            fullWidth 
            variant="contained" 
            onClick={(event) => {
              event.preventDefault();
              signInWithGoogle();
              }} 
            style={{color: '#DB4437'}}>
             <FontAwesomeIcon icon={faGoogle} size="2x" />
           </div>
          </Grid>
         </Grid>
         <Box mt={8}>
        <Copyright />
      </Box>
               </>
              )}
             
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
