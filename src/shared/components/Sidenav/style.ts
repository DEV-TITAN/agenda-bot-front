import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

export const SidenavContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  background: var(--gray-two);
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: var(--orange-400);

  img {
    width: 80px;
    height: 80px;
  }

  h1 {
    color: var(--white);
    font-weight: bold;
    font-size: 24px;
  }
`;

export const SidenavContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Item = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--purple-400);
  font-size: 18px;
  margin: 16px auto;
  transition: 0.5s;

  &:hover {
    opacity: 0.7;
  }

  &.${activeClassName} {
    color: var(--orange-400);
    font-weight: bold;
  }
`;

export const Footer = styled.button`
  background: transparent;
  border: none;

  p {
    font-weight: bold;
    margin: 8px 0;

    &:hover {
      opacity: 0.7;
    }
  }
`;
