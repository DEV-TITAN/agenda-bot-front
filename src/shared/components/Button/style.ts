import styled, { css } from 'styled-components';

interface ButtonProps {
  buttonSize?: 'small' | 'medium' | 'large';
  buttonType?:
    | 'primary'
    | 'secondary'
    | 'primaryOutline'
    | 'secondaryOutline'
    | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

const buttonSizeVariations = {
  small: css`
    height: 30px;
    font-size: 12px;
    padding: 4px 16px;
  `,
  medium: css`
    height: 35px;
    font-size: 14px;
    padding: 8px 20px;
  `,
  large: css`
    height: 40px;
    font-size: 16px;
    padding: 12px 16px;
  `,
};

const buttonTypeVariations = {
  primary: css`
    background-color: var(--blue-500);
    color: var(--white);
    border: none;
  `,
  secondary: css`
    background-color: var(--orange-400);
    color: var(--white);
    border: none;
  `,
  primaryOutline: css`
    background-color: var(--white);
    color: var(--blue-500);
    border: 2px solid var(--blue-500);
  `,
  secondaryOutline: css`
    background-color: var(--white);
    color: var(--orange-400);
    border: 2px solid var(--orange-400);
  `,
  danger: css`
    background-color: var(--danger);
    color: var(--white);
    border: none;
  `,
};

export const ButtonContainer = styled.button<ButtonProps>`
  border: 0;
  font-weight: 500;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  flex-direction: center;
  align-items: center;
  border-radius: 5px;
  width: fit-content;
  margin: auto;

  ${props => buttonSizeVariations[props.buttonSize || 'medium']}

  ${props => buttonTypeVariations[props.buttonType || 'primary']}

  &:hover {
    opacity: 0.7;
  }

  &:first-child {
    margin-right: 8px;
  }

  svg {
    margin-right: 5px;
  }

  ${props =>
    props.loading &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      background-color: var(--white);
      color: var(--neutral-gray-three);
      border: 2px solid var(--neutral-gray-three);

      p {
        color: var(--neutral-gray-three) !important;
      }
    `}
`;
