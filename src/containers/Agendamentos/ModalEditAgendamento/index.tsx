import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../../shared/components/Button';
import { InputSimple } from '../../../shared/components/InputSimple';
import {
  FormContainer,
  Section,
  SectionContact,
  SectionDate,
  SectionFrequency,
  SectionMonthly,
  SectionSelected,
  SectionWeekday,
  SectionWeekend,
} from './style';
import { Modal } from '../../../shared/components/Modal';
import { DatePicker, Select, Switch, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { translateMonth, translateWeekday } from '../../../helpers/masks';
import { DataSourceAgendamento } from '../../../helpers/interfaces';

export interface ModalEditAgendamentoProps {
  visible: boolean;
  closeModal(): void;
  fetch(): void;
  agendamento?: DataSourceAgendamento;
}

export function ModalEditAgendamento({
  visible,
  closeModal,
  fetch,
  agendamento,
}: ModalEditAgendamentoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>(agendamento?.title ?? '');
  const [contatosSelected, setContatosSelected] = useState<string[]>([]);
  const [audioSelected, setAudioSelected] = useState<string>();
  const [timeSelected, setTimeSelected] = useState<string>();
  const [periodicidadeSelected, setPeriodicidadeSelected] = useState<string>();
  const [deleteWeekend, setDeleteWeekend] = useState<boolean>(
    agendamento?.deleteWeekend ?? true,
  );
  const [weekdaySelected, setWeekdaySelected] = useState<string>();
  const [daySelected, setDaySelected] = useState<string>();
  const [dayMonthSelected, setDayMonthSelected] = useState<string>();

  const [loading, setLoading] = useState(false);

  const { agendamentosStore, contatosStore, audiosStore } = useStores();

  const [valueTime, setValueTime] = useState<Moment | null>();
  const [valueDate, setValueDate] = useState<Moment | null>();
  const [valueDateMonth, setValueDateMonth] = useState<Moment | null>();
  const { Option } = Select;
  const [optionsContatos, setOptionsContatos] = useState<JSX.Element[]>([]);
  const [optionsAudios, setOptionsAudios] = useState<JSX.Element[]>([]);
  const optionsPeriodicidade = [
    {
      key: 'Diária',
      value: 'daily',
    },
    {
      key: 'Semanal',
      value: 'weekly',
    },
    {
      key: 'Mensal',
      value: 'monthly',
    },
    {
      key: 'Anual',
      value: 'yearly',
    },
  ];

  const optionsDiaDaSemana = [
    {
      key: 'Segunda',
      value: 'monday',
    },
    {
      key: 'Terça',
      value: 'tuesday',
    },
    {
      key: 'Quarta',
      value: 'wednesday',
    },
    {
      key: 'Quinta',
      value: 'thursday',
    },
    {
      key: 'Sexta',
      value: 'friday',
    },
    {
      key: 'Sábado',
      value: 'saturday',
    },
    {
      key: 'Domingo',
      value: 'sunday',
    },
  ];

  const validateButton = title;

  async function submitEditAgendamento() {
    setIsLoading(true);
    console.info(valueTime);
    console.info(valueTime?.add);
    console.log(moment(agendamento?.hour));

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

      // const findContato = contatosStore.contatosList?.data.contacts.find(
      //   (item: ScannedInvoiceViewModel) => item.id === agendamento.co,
      // );

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

  useEffect(() => {
    setLoading(true);
    getContatos();
    getAudios();
  }, []);

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

        <SectionContact>
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
        </SectionContact>

        <SectionFrequency>
          <p>Áudio</p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione o áudio"
            onChange={(value: string) => setAudioSelected(value)}
          >
            {optionsAudios}
          </Select>
        </SectionFrequency>

        <SectionFrequency>
          <p>Periodicidade</p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Selecione a periodicidade"
            onChange={(value: string) => setPeriodicidadeSelected(value)}
          >
            {optionsPeriodicidade.map(option => (
              <Option key={option.key} value={option.value}>
                {option.key}
              </Option>
            ))}
          </Select>
        </SectionFrequency>

        {periodicidadeSelected === 'daily' && (
          <SectionWeekend>
            <p>Excluir final de semana</p>
            <Switch
              checked={deleteWeekend}
              onChange={value => setDeleteWeekend(value)}
            />
          </SectionWeekend>
        )}

        {periodicidadeSelected === 'weekly' && (
          <SectionWeekday>
            <Select
              showSearch
              value={weekdaySelected}
              style={{ width: '100%' }}
              placeholder="Selecione o dia da semana"
              onChange={(value: string) => setWeekdaySelected(value)}
            >
              {optionsDiaDaSemana.map(option => (
                <Option key={option.key} value={option.value}>
                  {option.key}
                </Option>
              ))}
            </Select>
          </SectionWeekday>
        )}

        {periodicidadeSelected === 'monthly' && (
          <SectionMonthly>
            <DatePicker
              value={valueDate}
              placeholder="Selecione o dia no mês"
              onChange={(value, dateString) => {
                setValueDate(value);
                setDaySelected(dateString.substring(0, 2));
              }}
              format="DD"
            />
          </SectionMonthly>
        )}

        {periodicidadeSelected === 'yearly' && (
          <SectionMonthly>
            <DatePicker
              value={valueDateMonth}
              placeholder="Selecione o dia e mês"
              onChange={(value, dateString) => {
                setValueDateMonth(value);
                setDayMonthSelected(dateString.substring(0, 5));
              }}
              format="DD/MM"
            />
          </SectionMonthly>
        )}

        <SectionDate>
          <TimePicker
            value={valueTime}
            onChange={(value, dateString) => {
              setValueTime(value);
              setTimeSelected(dateString);
            }}
          />
        </SectionDate>

        <SectionSelected>
          {periodicidadeSelected === 'daily' &&
            timeSelected &&
            !deleteWeekend &&
            `Todo dia, às ${timeSelected}.`}
          {periodicidadeSelected === 'daily' &&
            timeSelected &&
            deleteWeekend &&
            `Todo dia, às ${timeSelected}, exceto fins de semana.`}
          {periodicidadeSelected === 'weekly' &&
            timeSelected &&
            weekdaySelected &&
            `${translateWeekday(weekdaySelected)}, às ${timeSelected}.`}
          {periodicidadeSelected === 'monthly' &&
            timeSelected &&
            daySelected &&
            `Todo mês, dia ${daySelected}, às ${timeSelected}.`}
          {periodicidadeSelected === 'yearly' &&
            timeSelected &&
            dayMonthSelected &&
            `Todo ano, dia ${dayMonthSelected.substring(
              0,
              2,
            )} de ${translateMonth(
              dayMonthSelected.substring(3, 5),
            )}, às ${timeSelected}.`}
        </SectionSelected>

        <Button
          buttonSize="medium"
          buttonType="primary"
          type="submit"
          loading={isLoading}
          disabled={!validateButton}
          onClick={() => submitEditAgendamento()}
        >
          Confirmar
        </Button>
      </FormContainer>
    </Modal>
  );
}
