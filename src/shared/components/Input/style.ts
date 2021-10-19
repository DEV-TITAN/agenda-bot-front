import styled, { css } from 'styled-components';

import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 24px;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  border: 2px solid var(--white);
  color: var(--blue-500);

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--danger);
      color: var(--danger);
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--blue-500);
      color: var(--blue-500);
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--blue-500);
      color: var(--blue-500);
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    width: 100%;
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--purple-400);

    &::placeholder {
      color: var(--purple-500);
      font-size: 14px;
    }
  }

  svg {
    margin-right: 16px;

    &:last-child {
      cursor: pointer;
      margin-right: 0px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    cursor: pointer;
    margin: 0;
  }

  span {
    background: var(--danger);
    color: var(--white);

    &::before {
      border-color: var(--danger) transparent;
    }
  }
`;
