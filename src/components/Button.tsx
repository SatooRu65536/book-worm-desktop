import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const ButtonElement = styled.button<{ $dark: boolean }>`
  border: none;
  outline: none;
  appearance: none;

  font-size: 1.2rem;
  padding: 8px 10px;
  color: var(${({ $dark }) => ($dark ? '--background' : '--primary')});
  background-color: var(${({ $dark }) => ($dark ? '--primary' : '--background')});
  border-radius: 5px;
  cursor: pointer;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dark?: boolean;
}

const Button = (props: ButtonProps) => {
  const { dark, ...rest } = props;
  return <ButtonElement {...rest} $dark={dark ?? false} />;
};

export default Button;
