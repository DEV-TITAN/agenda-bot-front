import styled from 'styled-components';

export const SelectContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: space-between;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid var(--purple-500);
  background-color: var(--white);

  select {
    padding: 0 16px;
    width: 100%;
    border: none;
    border-radius: 6px;
    text-align: left;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-weight: bold;
    color: var(--purple-500);
    font-size: 18px;
    background-color: var(--white);
    background-size: 25px 8px;
  }

  option {
    font-weight: bold;
    color: var(--white);
    font-size: 18px;
    background: var(--purple-400);
    border: none;
    border: 2px solid var(--purple-400);
    margin: 24px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:focus,
    :hover {
      background: var(--white);
      color: var(--purple-400);
    }
  }
`;
