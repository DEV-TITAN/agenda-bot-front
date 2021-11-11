import styled, { css } from 'styled-components';

interface ChevronProps {
  disabled?: boolean;
}

export const ButtonChevron = styled.button<ChevronProps>`
  background: transparent;
  border: none;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      svg {
        color: var(--neutral-gray-three);
      }
    `}
`;
