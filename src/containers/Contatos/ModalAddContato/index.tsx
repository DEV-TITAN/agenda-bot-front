import React, { useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import { FormContainer, Section } from './style';
import { Modal } from '../../../shared/components/Modal';
import { phoneMask } from '../../../helpers/masks';

export interface ModalAddContatoProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
}

export function ModalAddContato({
  visible,
  closeModal,
  fetch,
}: ModalAddContatoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const { contatosStore } = useStores();

  async function submitAddContato() {
    setIsLoading(true);

    await contatosStore.addContato(name, phoneNumber);

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = name && phoneNumber;

  return (
    <Modal visible={visible} title="Adicionar contato" closeModal={closeModal}>
      <FormContainer>
        <Section>
          <p>Nome</p>
          <InputSimple
            value={name}
            name="name"
            handleOnChange={value => setName(value)}
          />
        </Section>

        <Section>
          <p>Telefone</p>
          <InputSimple
            value={phoneNumber}
            name="phoneNumber"
            handleOnChange={value => setPhoneNumber(phoneMask(value))}
          />
        </Section>

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          disabled={!validateButton}
          onClick={() => submitAddContato()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
