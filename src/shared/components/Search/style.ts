import styled from 'styled-components';
import searchIcon from '../../../assets/search.png';

export const SearchContainer = styled.input.attrs({ type: 'text' })`
  height: 40px;
  width: 100%;
  max-width: 800px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: left;
  background-size: 40px 20px;
  padding-left: 50px;
  border-radius: 16px;
  margin: 22px 16px;
  border: 1px solid var(--neutral-gray-four);
  color: var(--neutral-gray-three);
  &:focus,
  :hover {
    border: 1px solid var(--neutral-gray-three);
  }
`;
