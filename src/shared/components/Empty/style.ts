import styled from 'styled-components';

export const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  height: 100%;

  img {
    width: 74px;
  }

  p {
    color: var(--neutral-gray-five);
    text-align: center;
    font-size: 16px;
    margin: 8px 0;
  }
`;
