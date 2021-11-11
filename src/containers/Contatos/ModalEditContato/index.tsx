import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import { Modal } from '../../../../shared/components/Modal';
import { ContainerLoading, FormContainer, Section } from './style';
import { useStores } from '../../../../stores/RootStore';
import { InputSimple } from '../../../../shared/components/InputSimple';
import { UserData } from '../../../../helpers/interfaces';
import { Loading } from '../../../../shared/components/Loading';
import { dateMask } from '../../../../helpers/masks';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';

export interface ModalEditStudentProps {
  initialValue?: UserData | null;
  visible: boolean;
  loading: boolean;
  closeModal(): void;
  onClick(): void;
  fetch(): void;
}

export function ModalEditContato({
  loading,
  initialValue,
  visible,
  closeModal,
  onClick,
  fetch,
}: ModalEditStudentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>(
    initialValue?.firstName ?? '',
  );
  const [surname, setSurname] = useState<string>(initialValue?.surname ?? '');
  const [email, setEmail] = useState<string>(initialValue?.email ?? '');
  const oldValidityCredits = initialValue?.validityCredits?.split('-') ?? '';

  const [validityCredits, setValidatyCredits] = useState<string | null>(
    initialValue?.validityCredits
      ? `${oldValidityCredits[2]}/${oldValidityCredits[1]}/${oldValidityCredits[0]}`
      : '',
  );

  const [totalCredits, setTotalCredits] = useState<number>(
    initialValue?.totalCredits ?? 0,
  );

  const { adminStore } = useStores();

  async function submitEditUser() {
    setIsLoading(true);

    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('totalCredits', String(totalCredits));

    if (validityCredits) {
      formData.append('validityCredits', validityCredits as string);
    }

    await adminStore.editUser(
      initialValue?.id ?? '',
      formData,
      'Aluno/a editado/a com sucesso!',
    );

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = firstName && surname && email && isValidEmail(email);

  return (
    <Modal visible={visible} title="Editar aluno/a" closeModal={closeModal}>
      {loading ? (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      ) : (
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
            <p>Sobrenome</p>
            <InputSimple
              value={surname}
              name="surname"
              handleOnChange={value => setSurname(value)}
            />
          </Section>

          <Section>
            <p>Email</p>
            <InputSimple
              value={email}
              name="email"
              handleOnChange={value => setEmail(value)}
              error={
                email && !isValidEmail(email) ? 'Digite um email válido' : ''
              }
            />
          </Section>

          <Section>
            <p>Total de créditos</p>
            <InputSimple
              value={totalCredits}
              name="totalCredits"
              type="number"
              handleOnChange={value => setTotalCredits(value)}
            />
          </Section>

          <Section>
            <p>Validade dos créditos</p>
            <InputSimple
              value={validityCredits ?? ''}
              name="validityCredits"
              handleOnChange={value => setValidatyCredits(dateMask(value))}
            />
          </Section>

          <Button
            buttonSize="medium"
            buttonType="primary"
            type="submit"
            loading={isLoading}
            onClick={() => {
              submitEditUser();
              onClick();
            }}
            disabled={!validateButton}
          >
            Confirmar
          </Button>
        </FormContainer>
      )}
    </Modal>
  );
}
