import React, { useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import { FormContainer, Section } from './style';
import { Modal } from '../../../shared/components/Modal';
import { DataSourceAudio } from '../../../helpers/interfaces';
import { Upload } from '../../../shared/components/Upload';

export interface ModalEditAudioProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
  audio?: DataSourceAudio;
}

export function ModalEditAudio({
  visible,
  closeModal,
  fetch,
  audio,
}: ModalEditAudioProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>(audio?.title ?? '');
  const [newAudio, setNewAudio] = useState<File[]>([]);

  const { audiosStore } = useStores();

  async function submitEditAudio() {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('audio', newAudio[0]);

    await audiosStore.editAudio(audio?.key ?? '', formData);

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = title;

  return (
    <Modal visible={visible} title="Editar áudio" closeModal={closeModal}>
      <FormContainer>
        <Section>
          <p>Título</p>
          <InputSimple
            value={title}
            name="title"
            handleOnChange={value => setTitle(value)}
          />
        </Section>

        <Section>
          <p>Reprodução</p>
          <Upload
            handleOnChange={value => setNewAudio(value)}
            currentAudio={audio?.url ?? null}
          />
        </Section>

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          disabled={!validateButton}
          onClick={() => submitEditAudio()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
