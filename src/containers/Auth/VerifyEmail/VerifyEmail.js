import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainForm from '../../../modules/views/MainForm'
import { FormWrapper } from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Button from '../../../components/UI/Forms/Button/Button';
import Message from '../../../components/UI/Message/Message';
import {Typography} from '@material-ui/core'
import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const VerifyEmail = ({ sendVerification, error, loading, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <MainForm>
      <Wrapper>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
             Verify your email
          </Typography>
          <Typography variant="body2" align="center">
             Go to your email inbox, and please verify your email.
          </Typography>
        </React.Fragment>
        <div style={{padding: '10px'}} />
        <Button
          loading={loading ? 'Sending email...' : null}
          disabled={loading}
          onClick={() => sendVerification()}
          
        >
          Re-send verification email
        </Button>
        <MessageWrapper>
          <Message error show={error}>
            {error}
          </Message>
        </MessageWrapper>
        <MessageWrapper>
          <Message success show={error === false}>
            Message sent successfully!
          </Message>
        </MessageWrapper>
      </Wrapper>
    </MainForm>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error,
});

const mapDispatchToProps = {
  sendVerification: actions.verifyEmail,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
