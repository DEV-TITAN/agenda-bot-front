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
import { Table } from 'antd';
import { ModalAddAgendamento } from './ModalAddAgendamento';
import { string } from 'yup/lib/locale';

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

  const [
    agendamentoSelected,
    setAgendamentoSelected,
  ] = useState<DataSourceAgendamento>();

  const debounceQuery = debounceSearch(500);

  const { agendamentosStore } = useStores();

  const pageSize = 4;

  async function fetchAgendamentosData(searchName?: string) {
    setLoading(true);
    await agendamentosStore
      .getAgendamentosList(currentPage, pageSize, searchName)
      .finally(() => {
        setLoading(false);

        const DataSource = agendamentosStore.agendamentosList?.data.schedules.map(
          agendamento => {
            return {
              key: agendamento.id,
              title: agendamento.title,
              pause: agendamento.pause,
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

  useEffect(() => {
    setLoading(true);
    fetchAgendamentosData(search);
  }, [currentPage]);

  // remover depois de implementar o back
  const DataSource: DataSourceAgendamento[] = [
    {
      key: '564841566465844644',
      title: 'Natal',
      pause: true,
    },
    {
      key: '564841566465844645',
      title: 'Ano novo',
      pause: false,
    },
  ];

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'pause',
      key: 'pause',
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
    </>
  );
}

export const Agendamentos = observer(AgendamentosComp);
