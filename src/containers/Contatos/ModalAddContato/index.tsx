import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { FormContainer, Section } from './style';
import { useStores } from '../../../stores/RootStore';
import { InputSimple } from '../../../shared/components/InputSimple';
import { dateMask } from '../../../helpers/masks';
import { isValidEmail, isValidPhone } from '@brazilian-utils/brazilian-utils';

export interface ModalAddStudentProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
}

export function ModalAddContato({
  visible,
  closeModal,
  fetch,
}: ModalAddStudentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { contatosStore } = useStores();

  async function submitAddUser() {
    setIsLoading(true);

    await contatosStore.addUser(
      firstName,
      phone,
      'Contato adicionado com sucesso!',
    );

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = firstName && isValidPhone(phone);

  return (
    <Modal visible={visible} title="Adicionar aluno/a" closeModal={closeModal}>
      <FormContainer>
        <Section>
          <p>Nome</p>
          <InputSimple
            value={firstName}
            name="firstName"
            handleOnChange={value => setFirstName(value)}
          />
        </Section>

        <Section>
          <p>Email</p>
          <InputSimple
            value={phone}
            name="email"
            handleOnChange={value => setPhone(value)}
            error={
              phone && !isValidPhone(phone)
                ? 'Digite um número de telefone válido'
                : ''
            }
          />
        </Section>

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          onClick={() => submitAddUser()}
          disabled={!validateButton}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
