import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Support = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    background: transparent;
    margin: 0 5px 0 16px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 16px;

  p {
    color: var(--purple-800);
    font-weight: bold;
    margin: 6px 0;
  }

  div {
    width: 630px;
    margin-bottom: 16px;

    div {
      margin: 0;
    }
  }
`;
