import styled from 'styled-components'

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'success' | 'neutral'

interface ButtonContainerProps {
  variant: ButtonVariants;

};

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
  neutral: 'white',
}

/* Dizemos qual elemento HTML será estilizado abaixo */
export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    border-radius: 4px;
    border: 0;

    margin-right: 16px;

    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};

    /* ${props => {
        return `background-color: ${buttonVariants[props.variant]}`
    }} */
`
