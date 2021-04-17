import React from 'react';
import styled from 'styled-components';
import {TextField, makeStyles,} from '@material-ui/core'

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

}));

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background-color: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem;
  border: none;

  &::placeholder {
    color: var(--color-white);
  }
`;

const Error = styled.div`
  color: var(--color-errorRed);
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '30px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  const classes = useStyles
  return (
    <InputWrapper>
      <TextField variant='outlined' className={classes.field} fullWidth {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </InputWrapper>
  );
};

export default Input;
