import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MainForm from '../modules/views/MainForm';
import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'

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
}));

function ForgotPassword() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const disabled = email === "";

  function onSubmit(event) {
    event.preventDefault();
    console.log('email: '+email)
    
    auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      setEmailHasBeenSent(true);
      setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
    })
    .catch(() => {
      setError("Error resetting password");
    });
  }

  return (
    <React.Fragment>
      <MainForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
        </React.Fragment>
       <form action="" className={classes.form}>
                 {emailHasBeenSent && (
                   <Alert severity="success">
                     An email has been sent to you!
                   </Alert>
                 )}
                 {error !== null && (
                 <Alert severity="error">{error}</Alert>
                )}
              <TextField
                autoFocus
                className={classes.field}
                autoComplete="email"
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
                onChange={e => setEmail(e.target.value)} 
                value={email}
              />
             
              <div style={{padding: '15px'}} />
             
             < Button
                disabled={disabled}
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}>Send me a reset link
                </Button>
            </form>
          <Box mt={8}>
        <Copyright />
      </Box>
      </MainForm>
    </React.Fragment>
  );
}

export default ForgotPassword;


