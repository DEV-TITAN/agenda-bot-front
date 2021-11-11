import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 6px;

    p {
      color: var(--purple-400);
      margin-right: 6px;
    }
  }
`;

export const CurrentPage = styled.div`
  font-weight: bold;
  color: var(--white);
  background: var(--purple-400);
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
