import React, { useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import { FormContainer, Section } from './style';
import { Modal } from '../../../shared/components/Modal';
import { Upload } from '../../../shared/components/Upload';

export interface ModalAddAudioProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
}

export function ModalAddAudio({
  visible,
  closeModal,
  fetch,
}: ModalAddAudioProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [audio, setAudio] = useState<File[]>([]);

  const { audiosStore } = useStores();

  async function submitAddAudio() {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('audio', audio[0]);

    await audiosStore.addAudio(formData);

    fetch();
    setIsLoading(false);
    closeModal();
  }

  const validateButton = title && audio.length;

  return (
    <Modal visible={visible} title="Adicionar áudio" closeModal={closeModal}>
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
          <p>Áudio</p>
          <Upload
            handleOnChange={value => setAudio(value)}
            currentAudio={null}
          />
        </Section>

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          disabled={!validateButton}
          onClick={() => submitAddAudio()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
