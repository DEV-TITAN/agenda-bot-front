import styled from 'styled-components';

export const DropzoneUploadAudio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed var(--blue-500);
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  min-width: 400px;
  height: 80px;
  cursor: pointer;
  margin-bottom: 16px;

  p {
    color: var(--blue-500);
    font-weight: normal;
  }
`;

export const FileContent = styled.div`
  width: 100%;
  height: 100%;

  audio {
    width: 100%;
  }
`;

export const FileFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;

export const ButtonChange = styled.button`
  border: none;
  background: var(--orange-400);
  height: 35px;
  font-size: 14px;
  padding: 8px 20px;
  color: var(--white);
  border-radius: 5px;
  transition: 0.5s;
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;
