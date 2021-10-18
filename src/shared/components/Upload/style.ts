import styled from 'styled-components';

export const DropzoneUploadImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed var(--yellow-500);
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  min-width: 400px;
  height: 80px;
  cursor: pointer;

  p {
    color: var(--yellow-500);
  }
`;

export const FileContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const FileFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px !important;
  margin: 16px 0;
`;

export const ButtonChange = styled.button`
  border: none;
  background: var(--purple-400);
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

export const Thumb = styled.img`
  width: 300px;
  height: 200px;
  border: 1px solid var(--purple-500);
  margin: 16px 0;
`;
