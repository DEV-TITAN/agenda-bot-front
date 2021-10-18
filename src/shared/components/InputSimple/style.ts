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
  border: 2px solid var(--purple-500);
  color: var(--purple-500);

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--danger);
      color: var(--danger);
      margin-bottom: 8px;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--yellow-400);
      color: var(--yellow-400);
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--yellow-400);
      color: var(--yellow-400);
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

export const Error = styled.p`
  color: var(--danger) !important;
  font-size: 12px;
  margin-bottom: 16px;
`;
