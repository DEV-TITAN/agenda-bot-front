import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Search } from '../../shared/components/Search';
import { debounceSearch } from '../../helpers/search';
import { Button } from '../../shared/components/Button';
import { Actions } from '../Contatos/style';
import { Table } from 'antd';
import {
  AudiosContainer,
  AudiosContentButton,
  AudiosContentTable,
} from './style';
import { DataSourceAudio } from '../../helpers/interfaces';
import { useStores } from '../../stores/RootStore';
import { getDateBrazilian } from '../../helpers/utils';
import { ModalAddAudio } from './ModalAddAudio';
import { ModalConfirmation } from '../../shared/components/ModalConfirmation';
import { ModalEditAudio } from './ModaEditAudio';

function AudiosComp() {
  const [search, setSearch] = useState('');
  const [audiosData, setAudiosData] = useState<DataSourceAudio[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [audioSelected, setAudioSelected] = useState<DataSourceAudio>();

  const debounceQuery = debounceSearch(500);

  const { audiosStore } = useStores();

  const pageSize = 4;

  async function fetchAudiosData(searchName?: string) {
    setLoading(true);
    await audiosStore
      .getAudiosList(currentPage, pageSize, searchName)
      .finally(() => {
        setLoading(false);

        const DataSource = audiosStore.audiosList?.data.audios.map(audio => {
          return {
            key: audio.id,
            title: audio.title,
            url: audio.url,
            createdAt: getDateBrazilian(audio.createdAt),
          };
        });

        setAudiosData(DataSource ?? []);
      });
  }

  async function handleSearch(value: string) {
    setSearch(value);
    fetchAudiosData(value);
  }

  async function deleteAudio(id: string) {
    setLoading(true);
    await audiosStore.deleteAudio(id);
    fetchAudiosData();
    setModalDelete(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchAudiosData(search);
  }, [currentPage]);

  // remover depois de implementar o back
  const DataSource: DataSourceAudio[] = [
    {
      key: '564841566465844644',
      title: 'Promoção do milhão',
      createdAt: getDateBrazilian('2021-10-26T02:19:37.362Z'),
      url: 'https://titan-ci.s3.sa-east-1.amazonaws.com/audioteste.mp3',
    },
  ];

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Data de criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Reprodução',
      key: 'url',
      render: (record: DataSourceAudio) => (
        <audio controls>
          <track kind="captions" />
          <source src={record.url} type="audio/mp3" />
          <p>Formato não suportado</p>
        </audio>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (record: DataSourceAudio) => (
        <Actions>
          <Button
            type="button"
            buttonSize="small"
            buttonType="primary"
            onClick={() => {
              setModalEdit(true);
              setAudioSelected(record);
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
              setAudioSelected(record);
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
      <AudiosContainer>
        <Search
          onChange={({ target: { value } }) =>
            debounceQuery(value, handleSearch)
          }
        />

        <AudiosContentButton>
          <Button
            type="button"
            buttonSize="large"
            buttonType="primary"
            onClick={() => setModalAdd(true)}
          >
            Novo áudio
          </Button>
        </AudiosContentButton>

        <AudiosContentTable>
          <Table
            dataSource={audiosData}
            columns={columns}
            loading={loading}
            bordered
          />
        </AudiosContentTable>
      </AudiosContainer>

      {modalAdd && (
        <ModalAddAudio
          visible={modalAdd}
          closeModal={() => setModalAdd(false)}
          fetch={() => fetchAudiosData(search)}
        />
      )}

      {modalEdit && (
        <ModalEditAudio
          visible={modalEdit}
          audio={audioSelected}
          closeModal={() => setModalEdit(false)}
          fetch={() => fetchAudiosData(search)}
        />
      )}

      {modalDelete && (
        <ModalConfirmation
          visible={modalDelete}
          closeModal={() => setModalDelete(false)}
          title="Você tem certeza que desejar excluir o áudio?"
          onClick={() => deleteAudio(audioSelected?.key ?? '')}
          loading={loading}
        />
      )}
    </>
  );
}

export const Audios = observer(AudiosComp);
