import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: var(--danger);
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    width: 160px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--white);
    text-align: center;

    &::before {
      content: '';
      border-style: solid;
      border-color: var(--danger) transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 0.8;
    visibility: visible;
  }
`;
