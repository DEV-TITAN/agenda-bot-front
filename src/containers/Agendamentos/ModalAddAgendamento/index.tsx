import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import { FormContainer, Section } from './style';
import { Modal } from '../../../shared/components/Modal';
import { Select, Switch, TimePicker } from 'antd';
// import moment from 'moment';

export interface ModalAddAgendamentoProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
}

export function ModalAddAgendamento({
  visible,
  closeModal,
  fetch,
}: ModalAddAgendamentoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [contatosSelected, setContatosSelected] = useState<string[]>([]);
  const [audioSelected, setAudioSelected] = useState<string>();
  const [periodicidadeSelected, setPeriodicidadeSelected] = useState<string>();

  const [loading, setLoading] = useState(false);

  const { agendamentosStore, contatosStore, audiosStore } = useStores();

  const { Option } = Select;
  const [optionsContatos, setOptionsContatos] = useState<JSX.Element[]>([]);
  const [optionsAudios, setOptionsAudios] = useState<JSX.Element[]>([]);

  const validateButton = title;

  async function submitAddAgendamento() {
    setIsLoading(true);

    console.log(title, contatosSelected, audioSelected, periodicidadeSelected);

    fetch();
    setIsLoading(false);
    closeModal();
  }

  async function getContatos() {
    setLoading(true);
    await contatosStore.getContatosList().finally(() => {
      setLoading(false);

      const DataSourceContatos = contatosStore.contatosList?.data.contacts.map(
        contato => {
          return (
            <Option key={contato.id} value={contato.id}>
              {contato.name}
            </Option>
          );
        },
      );

      setOptionsContatos(DataSourceContatos ?? []);
    });
  }

  async function getAudios() {
    setLoading(true);
    await audiosStore.getAudiosList().finally(() => {
      setLoading(false);

      const DataSourceAudios = audiosStore.audiosList?.data.audios.map(
        audio => {
          return (
            <Option key={audio.id} value={audio.id}>
              {audio.title}
            </Option>
          );
        },
      );

      setOptionsAudios(DataSourceAudios ?? []);
    });
  }

  const onChange = (time: any) => {
    setValueTime(time);
    console.log(time);
    console.log(valueTime);
  };

  useEffect(() => {
    setLoading(true);
    getContatos();
    getAudios();
  }, []);

  const [valueTime, setValueTime] = useState(null);

  return (
    <Modal
      visible={visible}
      title="Adicionar agendamento"
      closeModal={closeModal}
    >
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
          <p>Contatos</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Selecione os contatos"
            defaultValue={[]}
            onChange={value => setContatosSelected(value)}
          >
            {optionsContatos}
          </Select>
        </Section>
        <Section>
          <p>Áudio</p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione o áudio"
            onChange={(value: string) => setAudioSelected(value)}
          >
            {optionsAudios}
          </Select>
        </Section>
        <Section>
          <p>Periodicidade</p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione a periodicidade"
            onChange={(value: string) => setPeriodicidadeSelected(value)}
          >
            <Option key="daily" value="daily">
              Diária
            </Option>
            <Option key="weekly" value="weekly">
              Semanal
            </Option>
            <Option key="monthly" value="monthly">
              Mensal
            </Option>
            <Option key="yearly" value="yearly">
              Anual
            </Option>
          </Select>
        </Section>
        {periodicidadeSelected === 'daily' && (
          <>
            <p>Excluir final de semana</p>
            <Switch defaultChecked onChange={value => console.log(value)} />
          </>
        )}
        <TimePicker value={valueTime} onChange={onChange} format="HH:mm:ss" />

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          disabled={!validateButton}
          onClick={() => submitAddAgendamento()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
