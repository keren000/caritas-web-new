import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainForm from '../../../modules/views/MainForm'
import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Message from '../../../components/UI/Message/Message';
import Button from '../../../components/UI/Forms/Button/Button';
import * as actions from '../../../store/actions';
import {Typography, Box, makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { Alert } from '@material-ui/lab';
import HeaderBar from '../../../modules/views/HeaderBar'

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

const MessageWrapper = styled.div`
  position: relative;
  bottom: -2rem;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
});

const RecoverPassword = ({ error, loading, sendEmail, cleanUp }) => {
  const classes = useStyles();
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
    <HeaderBar />
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await sendEmail(values);
        setSubmitting(false);
      }}
    >
      
      {({ isSubmitting, isValid }) => (
        <MainForm>
          <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot password?
          </Typography>
          <Typography variant="body2" align="center"  style={{fontSize: '15px'}}>
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
        </React.Fragment>
          <Form className={classes.form}>
            <Field
              type="email"
              name="email"
              label="Enter your email"
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Sending recover email...' : null}
              type="submit"
            >
              Recover email
            </Button>
            
            <MessageWrapper style={{marginTop: '-10px'}}>
              <Message error show={error}>
              <Alert severity="error">{error}</Alert>
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                {/* Recover email sent successfully! */}
                <Alert severity="success">
                Recover email sent successfully!
                   </Alert>
              </Message>
              
            </MessageWrapper>
            
          </Form>
          <Box mt={2}>
            <Copyright />
          </Box>
        </MainForm>
      )}
    </Formik>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPassword);

