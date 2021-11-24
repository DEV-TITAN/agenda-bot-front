import React from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Row } from './style';

export interface ModalProps {
  visible: boolean;
  loading: boolean;
  title?: string;
  closeModal(): void;
  onClick(): void;
}

export function ModalConfirmation({
  visible,
  loading,
  title,
  closeModal,
  onClick,
}: ModalProps) {
  return (
    <Modal visible={visible} title={title} closeModal={closeModal}>
      <Row>
        <Button
          buttonSize="medium"
          buttonType="danger"
          type="button"
          onClick={onClick}
          loading={loading}
        >
          Confirmar
        </Button>

        <Button
          buttonSize="medium"
          buttonType="primaryOutline"
          type="button"
          onClick={closeModal}
        >
          Cancelar
        </Button>
      </Row>
    </Modal>
  );
}
