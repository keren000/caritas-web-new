import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainForm from '../../../modules/views/MainForm'
import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';
import CustomLink from '../../../components/UI/CustomLink/CustomLink';
import {Typography,makeStyles, TextField, Divider, Grid, Box} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {signInWithFacebook, signInWithGoogle} from '../../../Firebase/Firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import firebase from '../../../Firebase/Firebase'
import HeaderBar from '../../../modules/views/HeaderBar'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
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
  margin: theme.spacing(3, 0, 2),
  backgroundColor: "#0133C0",
  color: '#FFF',
  "&:hover":{
    backgroundColor: "#214DC5"
  },
},
  feedback: {
    marginTop: theme.spacing(2),
  },
  link: {
    color:"#2859C5",
    textDecoration: "none"
  },
  facebookicon: {
    color: '#4267B2'
  },
  googleicon: {
    color: '#d34836'
  }
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
    .required('The password is required.')
    .min(5, 'Too short.'),
});

const Login = ({ login, loading, error, cleanUp }) => {
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
    <>
    <HeaderBar />
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <MainForm>
          <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center" style={{textTransform: "capitalize"}}>
            Sign In
          </Typography>
          <Typography variant="body2" align="center" style={{fontSize: '16px'}}>
            {'Not a member yet? '}
            <Link to="/signup" align="center" underline="always" className={classes.link}>
              Sign Up
            </Link>
          </Typography>
        </React.Fragment>
        <div style={{padding: '2px'}} />
          <Form className={classes.form}>
            {/* <Field
              type="email"
              name="email"
              placeholder="Your email..."
              component={Input}
            /> */}
            <Field name='email' type="email" component={Input}>
              {({ field, form, meta }) => (
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  inputProps = {{...field}}
                />
              )}
            </Field>
            {/* <Field
              type="password"
              name="password"
              placeholder="Your password..."
              component={Input}
            /> */}
             <Field name='password' type='password' component={Input}>
              {({ field, form, meta }) => (
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  inputProps = {{...field}}
                />
              )}
            </Field>
            <div style={{padding: '10px'}}/>
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Logging in...' : null}
              type="submit"
              style={{color: '#fff'}}
            >
              Login
            </Button>
            <div style={{padding: '10px'}}/>
            <Typography align="center">
            <CustomLink link="/recover" color="#0133C0">
              Forgot your password?
            </CustomLink>
            </Typography>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <div style={{padding: '15px'}} />
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
              onClick={(event) => {
                event.preventDefault();
                signInWithFacebook();
                }}  
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
          </Form>
          <Box mt={8}>
        <Copyright />
      </Box>
        </MainForm>
      )}
    </Formik>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);


