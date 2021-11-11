import styled from 'styled-components';

export const ContainerCardHorizontal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 80%;
  min-width: 60vw;
  margin: 8px 54px;
  padding: 16px 24px;
  min-height: 100px;
`;

export const CardHorizontalInfor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  div {
    color: var(--purple-200);
    margin-right: 24px;

    p {
      color: var(--purple-600);
      font-weight: bold;
      margin: 8px 0;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export const Edit = styled.button`
  border: none;
  background: transparent;
  background: var(--yellow-300);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 4px 0;

  &:hover {
    opacity: 0.7;
  }
`;

export const Trash = styled.button`
  border: none;
  background: transparent;
  background: var(--danger);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 4px 0;

  &:hover {
    opacity: 0.7;
  }
`;
