import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${({ contain }) => (contain ? 'auto' : '100%')};
  outline: none;
  padding: 1.2rem 5rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  color: var(--color-white);
  font-weight: 500;
  box-shadow: 0rem 0.1rem 3.5rem var(--shadow);
  background-color: #0133C0;
 
  border: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #333;
  }
`;

const Button = ({ children, disabled, loading, contain, color, ...rest }) => {
  return (
    <StyledButton color={color} contain={contain} disabled={disabled} {...rest}>
      {loading ? loading : children}
    </StyledButton>
  );
};

export default Button;
