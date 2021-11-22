import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';

import { debounceSearch } from '../../helpers/search';
import { useStores } from '../../stores/RootStore';
import { Search } from '../../shared/components/Search';
import {
  ContatosContainer,
  ContatosContentButton,
  ContatosContentTable,
} from './style';
import { Button } from '../../shared/components/Button';
import { Table } from 'antd';
import { DataSourceContato } from '../../helpers/interfaces';

function ContatosComp() {
  const [search, setSearch] = useState('');
  const [contatosData, setContatosData] = useState<DataSourceContato[]>([]);
  const debounceQuery = debounceSearch(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    fetchContatosData(search);
  }, [currentPage]);

  async function handleSearch(value: string) {
    setSearch(value);
    fetchContatosData(value);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <>
          <button type="button">Editar</button>
          <button type="button">Deletar</button>
        </>
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
          <Button type="button" buttonSize="large" buttonType="primary">
            Novo contato
          </Button>
        </ContatosContentButton>

        <ContatosContentTable>
          <Table dataSource={contatosData} columns={columns} />
        </ContatosContentTable>
      </ContatosContainer>
    </>
  );
}

export const Contatos = observer(ContatosComp);
