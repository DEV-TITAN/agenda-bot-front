import styled from 'styled-components';

export const ContainerCard = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--purple-400);
  box-shadow: 0px 0px 15px var(--purple-100);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 16px;
`;

export const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CardInfor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: var(--white);
  text-align: center;

  img {
    width: 300px;
    height: 200px;
    border-radius: 10px 10px 0px 0px;
  }

  h6 {
    font-weight: bold;
    font-size: 18px;
    margin: 4px auto;
    padding: 6px 10px;
  }

  p {
    color: var(--yellow-500);
  }
`;
