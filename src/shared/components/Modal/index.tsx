import React from 'react';
import btnClose from '../../../assets/close.png';
import { ModalContainer, Container, ButtonClose, Content } from './style';

export interface ModalProps {
  visible: boolean;
  title?: string;
  closeModal(): void;
  children: JSX.Element;
}

export function Modal({ visible, title, children, closeModal }: ModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <ModalContainer>
      <Container>
        <ButtonClose onClick={closeModal}>
          <img src={btnClose} alt="btnClose" />
        </ButtonClose>
        <h2>{title}</h2>
        <Content>{children}</Content>
      </Container>
    </ModalContainer>
  );
}
