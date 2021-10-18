import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(76, 80, 176, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: 0.3s ease-in all;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: var(--white);
  box-shadow: 0px 2px 20px rgba(76, 80, 176, 0.2);
  border-radius: 8px;
  padding: 28px 36px;
  max-height: 90vh;
  height: auto;
  position: relative;

  h2 {
    color: var(--purple-400);
    font-weight: bold;
    font-size: 18px;
  }
`;

export const ButtonClose = styled.button`
  background: transparent;
  position: absolute;
  border: none;
  right: -10px;
  top: -10px;
  z-index: 100;

  img {
    width: 30px;
  }
`;

export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;
