import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    #666bcc 0%,
    rgba(102, 107, 204, 0.7) 100%
  );
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${appearFromLeft} 1s;

  form {
    margin: 30px 0;
    text-align: center;
  }

  a {
    color: var(--purple-300);
    margin-top: 16px;
    text-align: center;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AreaButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    text-decoration: none;
    margin-top: 0;
  }
`;
