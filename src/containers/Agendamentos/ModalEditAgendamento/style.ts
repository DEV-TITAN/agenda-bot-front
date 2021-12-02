import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
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

  p {
    color: var(--blue-500);
    font-weight: bold;
  }

  div {
    width: 400px;
    margin: 0;
  }
`;

export const SectionContact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    color: var(--blue-500);
    font-weight: bold;
    margin: 20px 0 6px;
  }

  div {
    width: 400px;
  }
`;

export const SectionFrequency = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    color: var(--blue-500);
    font-weight: bold;
    margin: 20px 0 6px;
  }
`;

export const SectionWeekend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    color: var(--blue-500);
    margin: 20px 0 6px;
  }
`;

export const SectionDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 24px 0 16px;

  div {
    max-height: 36px;
  }
`;

export const SectionSelected = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: var(--blue-500);
  color: var(--white);
  padding: 4px 8px;
  border-radius: 6px;
  margin: 8px 0 28px;
  width: 100%;
  height: 36px;
`;

export const SectionWeekday = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 24px 0 0px;
`;

export const SectionMonthly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 24px;

  div {
    width: 250px;
  }
`;
