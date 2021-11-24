import React, { useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import { FormContainer, Section } from './style';
import { Modal } from '../../../shared/components/Modal';
import { phoneMask } from '../../../helpers/masks';
import { DataSourceContato } from '../../../helpers/interfaces';

export interface ModalEditContatoProps {
  visible: boolean;
  contato?: DataSourceContato;
  closeModal(): void;
  fetch(): void;
}

export function ModalEditContato({
  visible,
  contato,
  closeModal,
  fetch,
}: ModalEditContatoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>(contato?.name ?? '');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    contato?.phoneNumber ?? '',
  );

  const { contatosStore } = useStores();

  async function submitEditContato() {
    setIsLoading(true);

    await contatosStore.editContato(contato?.key ?? '', name, phoneNumber);

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = name && phoneNumber;

  return (
    <Modal visible={visible} title="Editar contato" closeModal={closeModal}>
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
          onClick={() => submitEditContato()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
