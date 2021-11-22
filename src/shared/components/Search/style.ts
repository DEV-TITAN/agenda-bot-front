import styled from 'styled-components';
import searchIcon from '../../../assets/search.png';

export const SearchContainer = styled.input.attrs({ type: 'text' })`
  height: 40px;
  width: 100%;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: left;
  background-size: 40px 20px;
  padding-left: 50px;
  border-radius: 16px;
  border: 1px solid var(--gray-two);
  color: var(--blue-500);

  &:focus,
  :hover {
    border: 1px solid var(--blue-500);
    transition: 0.7s;
  }
`;
