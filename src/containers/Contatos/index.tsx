import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';

import { debounceSearch } from '../../helpers/search';
import { useStores } from '../../stores/RootStore';
import { Search } from '../../shared/components/Search';
import {
  Actions,
  ContatosContainer,
  ContatosContentButton,
  ContatosContentTable,
} from './style';
import { Button } from '../../shared/components/Button';
import { Table } from 'antd';
import { DataSourceContato } from '../../helpers/interfaces';
import { ModalAddContato } from './ModalAddContato';
import { ModalConfirmation } from '../../shared/components/ModalConfirmation';
import { ModalEditContato } from './ModalEditContato';

function ContatosComp() {
  const [search, setSearch] = useState('');
  const [contatosData, setContatosData] = useState<DataSourceContato[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [contatoSelected, setContatoSelected] = useState<DataSourceContato>();

  const debounceQuery = debounceSearch(500);

  const { contatosStore } = useStores();

  const pageSize = 4;

  async function fetchContatosData(searchName?: string) {
    setLoading(true);
    await contatosStore
      .getContatosList(currentPage, pageSize, searchName)
      .finally(() => {
        setLoading(false);

        const DataSource = contatosStore.contatosList?.data.contacts.map(
          contato => {
            return {
              key: contato.id,
              name: contato.firstName,
              phoneNumber: contato.phoneNumber,
            };
          },
        );

        setContatosData(DataSource ?? []);
      });
  }

  async function handleSearch(value: string) {
    setSearch(value);
    fetchContatosData(value);
  }

  async function deleteContato(id: string) {
    setLoading(true);
    await contatosStore.deleteContato(id);
    fetchContatosData();
    setModalDelete(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchContatosData(search);
  }, [currentPage]);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (record: DataSourceContato) => (
        <Actions>
          <Button
            type="button"
            buttonSize="small"
            buttonType="primary"
            onClick={() => {
              setModalEdit(true);
              setContatoSelected(record);
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
              setContatoSelected(record);
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
      <ContatosContainer>
        <Search
          onChange={({ target: { value } }) =>
            debounceQuery(value, handleSearch)
          }
        />
        <ContatosContentButton>
          <Button
            type="button"
            buttonSize="large"
            buttonType="primary"
            onClick={() => setModalAdd(true)}
          >
            Novo contato
          </Button>
        </ContatosContentButton>

        <ContatosContentTable>
          <Table
            dataSource={contatosData}
            columns={columns}
            loading={loading}
            bordered
          />
        </ContatosContentTable>
      </ContatosContainer>

      {modalAdd && (
        <ModalAddContato
          visible={modalAdd}
          closeModal={() => setModalAdd(false)}
          fetch={() => fetchContatosData(search)}
        />
      )}

      {modalEdit && (
        <ModalEditContato
          visible={modalEdit}
          contato={contatoSelected}
          closeModal={() => setModalEdit(false)}
          fetch={() => fetchContatosData(search)}
        />
      )}

      {modalDelete && (
        <ModalConfirmation
          visible={modalDelete}
          closeModal={() => setModalDelete(false)}
          title="Você tem certeza que desejar excluir o contato?"
          onClick={() => deleteContato(contatoSelected?.key ?? '')}
          loading={loading}
        />
      )}
    </>
  );
}

export const Contatos = observer(ContatosComp);
