import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { debounceSearch } from '../../helpers/search';
import { Search } from '../../shared/components/Search';
import { useStores } from '../../stores/RootStore';
import { DataSourceAgendamento } from '../../helpers/interfaces';
import { Button } from '../../shared/components/Button';
import {
  Actions,
  AgendamentosContainer,
  AgendamentosContentButton,
  AgendamentosContentTable,
} from './style';
import { Table, Tag } from 'antd';
import { ModalAddAgendamento } from './ModalAddAgendamento';
import { translateMonth, translateWeekday } from '../../helpers/masks';
import { ModalConfirmation } from '../../shared/components/ModalConfirmation';
import { ModalEditAgendamento } from './ModalEditAgendamento';
import { ModalAutenticarWhatsApp } from '../ModalAutenticarWhatsApp';

function AgendamentosComp() {
  const [search, setSearch] = useState('');
  const [agendamentosData, setAgendamentosData] = useState<
    DataSourceAgendamento[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAutenticarWhatsApp, setModalAutenticarWhatsApp] = useState(true);

  const [agendamentoSelected, setAgendamentoSelected] =
    useState<DataSourceAgendamento>();

  const debounceQuery = debounceSearch(500);

  const { agendamentosStore } = useStores();

  const pageSize = 4;

  async function fetchAgendamentosData(searchName?: string) {
    setLoading(true);
    await agendamentosStore
      .getAgendamentosList(currentPage, pageSize, searchName)
      .finally(() => {
        setLoading(false);

        const DataSource =
          agendamentosStore.agendamentosList?.data.schedules.map(
            agendamento => {
              return {
                key: agendamento.id,
                title: agendamento.title,
                pause: agendamento.pause,
                frequency: agendamento.frequency,
                hour: agendamento.hour,
              };
            },
          );

        setAgendamentosData(DataSource ?? []);
      });
  }

  async function handleSearch(value: string) {
    setSearch(value);
    fetchAgendamentosData(value);
  }

  async function deleteAgendamento(id: string) {
    setLoading(true);
    await agendamentosStore.deleteContato(id);
    fetchAgendamentosData();
    setModalDelete(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchAgendamentosData(search);
  }, [currentPage]);

  // remover depois de implementar o back
  const DataSource: DataSourceAgendamento[] = [
    {
      key: '1',
      title: 'Natal',
      pause: true,
      hour: '15:30:10',
      frequency: 'daily',
      // frequência diária
      deleteWeekend: true,
      date: '20/05/2022',
    },
    {
      key: '2',
      title: 'Ano novo',
      pause: false,
      hour: '15:30:10',
      frequency: 'weekly',
      // frequência semanal
      weekday: 'friday',
      date: '20/05/2022',
    },
    {
      key: '3',
      title: 'PicPay',
      pause: true,
      hour: '15:30:10',
      frequency: 'monthly',
      // frequência mensal
      day: '20',
      date: '20/05/2022',
    },
    {
      key: '4',
      title: 'Não Inviabilize',
      pause: false,
      hour: '15:30:10',
      frequency: 'yearly',
      // frequência anual
      dayMonth: '24/12',
      date: '24/12/2022',
    },
    {
      key: '5',
      title: 'São João',
      pause: true,
      hour: '15:30:10',
      frequency: 'daily',
      // frequência diária
      deleteWeekend: false,
      date: '20/05/2022',
    },
    {
      key: '6',
      title: 'Jusbrasil',
      pause: true,
      hour: '15:30:10',
      frequency: 'custom',
      // frequência personalizada
      customDate: '31/01/2022',
      date: '31/01/2022',
    },
  ];

  const columns = [
    {
      title: 'Título',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Periodicidade',
      key: 'frequency',
      render: (record: DataSourceAgendamento) => (
        <>
          {record.frequency === 'daily' &&
            !record.deleteWeekend &&
            record.hour &&
            `Todo dia, às ${record.hour}.`}
          {record.frequency === 'daily' &&
            record.deleteWeekend &&
            record.hour &&
            `Todo dia, às ${record.hour}, exceto fins de semana.`}
          {record.frequency === 'weekly' &&
            record.hour &&
            record.weekday &&
            `${translateWeekday(record.weekday)}, às ${record.hour}.`}
          {record.frequency === 'monthly' &&
            record.hour &&
            record.day &&
            `Todo mês, dia ${record.day}, às ${record.hour}.`}
          {record.frequency === 'yearly' &&
            record.hour &&
            record.dayMonth &&
            `Todo ano, dia ${record.dayMonth.substring(
              0,
              2,
            )} de ${translateMonth(record.dayMonth.substring(3, 5))}, às ${
              record.hour
            }.`}

          {record.frequency === 'custom' &&
            record.hour &&
            record.date &&
            `Uma única vez, dia ${record.date}, às ${record.hour}.`}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'pause',
      render: (record: DataSourceAgendamento) => (
        <>
          {!record.pause ? (
            <Tag color="green">ativo</Tag>
          ) : (
            <Tag color="red">pausado</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (record: DataSourceAgendamento) => (
        <Actions>
          <Button
            type="button"
            buttonSize="small"
            buttonType="primary"
            onClick={() => {
              setModalEdit(true);
              setAgendamentoSelected(record);
            }}
          >
            Editar
          </Button>
          <Button
            type="button"
            buttonSize="small"
            buttonType="danger"
            onClick={() => {
              setModalDelete(true);
              setAgendamentoSelected(record);
            }}
          >
            Deletar
          </Button>
        </Actions>
      ),
    },
  ];

  return (
    <>
      <AgendamentosContainer>
        <Search
          onChange={({ target: { value } }) =>
            debounceQuery(value, handleSearch)
          }
        />

        <AgendamentosContentButton>
          <Button
            type="button"
            buttonSize="large"
            buttonType="primary"
            onClick={() => setModalAdd(true)}
          >
            Novo agendamento
          </Button>
        </AgendamentosContentButton>

        <AgendamentosContentTable>
          <Table
            dataSource={DataSource}
            columns={columns}
            loading={loading}
            bordered
          />
        </AgendamentosContentTable>
      </AgendamentosContainer>

      {modalAdd && (
        <ModalAddAgendamento
          visible={modalAdd}
          closeModal={() => setModalAdd(false)}
          fetch={() => fetchAgendamentosData(search)}
        />
      )}

      {modalEdit && (
        <ModalEditAgendamento
          visible={modalEdit}
          agendamento={agendamentoSelected}
          closeModal={() => setModalEdit(false)}
          fetch={() => fetchAgendamentosData(search)}
        />
      )}

      {modalDelete && (
        <ModalConfirmation
          visible={modalDelete}
          closeModal={() => setModalDelete(false)}
          title="Você tem certeza que desejar excluir o agendamento?"
          onClick={() => deleteAgendamento(agendamentoSelected?.key ?? '')}
          loading={loading}
        />
      )}

      {modalAutenticarWhatsApp && (
        <ModalAutenticarWhatsApp
          visible={modalAutenticarWhatsApp}
          closeModal={() => setModalAutenticarWhatsApp(false)}
        />
      )}
    </>
  );
}

export const Agendamentos = observer(AgendamentosComp);
