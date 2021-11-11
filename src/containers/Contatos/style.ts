import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  display: inline;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    #eff1f1 0%,
    rgba(239, 241, 241, 0.7) 100%
  );
`;

export const GridTemplate = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'logo content content'
    'sidenav content content'
    'sidenav content content';
  grid-template-rows: 1fr 9fr 1fr;
  grid-template-columns: 1fr 6fr 1fr;
`;

export const ContentLogo = styled.div`
  grid-area: logo;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 317px;
  height: 108px;
  background: var(--orange-400);
  padding: 24px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 70px;
  }

  h1 {
    color: var(--white);
    font-size: 28px;
    font-weight: bold;
  }
`;

export const ContentSideNav = styled.div`
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 317px;
  background: var(--gray-one);
  padding: 24px;
`;

export const SideNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    color: var(--black);
    font-size: 24px;
    font-weight: bold;
    padding: 17px;
    text-decoration: none;
  }
`;

export const ContentConteudo = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: var(--gray-two);
  padding: 24px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContatosList = styled.div`
  max-width: 1150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;
