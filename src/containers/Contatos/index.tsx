import { faSearch } from '@fortawesome/free-solid-svg-icons';
import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserData } from '../../helpers/interfaces';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import { debounceSearch } from '../../helpers/search';
import getValidationErrors from '../../helpers/errorsValidation';
import { useStores } from '../../stores/RootStore';
import CardHorizontal from '../../shared/components/CardHorizontal';
import { Empty } from '../../shared/components/Empty';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Search } from '../../shared/components/Search';
import { Loading } from '../../shared/components/Loading';
import { ModalAddContato } from './ModalAddContato';
import { ModalEditContato } from './ModalEditContato';
import { Pagination } from '../../shared/components/Pagination';
import {
  Container,
  ContentConteudo,
  ContentLogo,
  ContentSideNav,
  GridTemplate,
  Logo,
  SideNav,
  Row,
  ContentContatosList,
} from './style';

function ContatosComp() {
  const [search, setSearch] = useState('');
  const debounceQuery = debounceSearch(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [initialStudent, setInitialContato] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const { contatosStore } = useStores();

  const [idTo, setIdTo] = useState('');

  const pageSize = 4;

  async function fetchContatosData(searchTheme?: string) {
    setLoading(true);
    await contatosStore
      .getContatosList('student', currentPage, pageSize, searchTheme)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetchContatosData(search);
  }, [currentPage]);

  async function handleSearch(value: string) {
    setSearch(value);
    fetchContatosData(value);
  }

  async function deleteContato(id: string) {
    setLoading(true);
    await contatosStore.deleteContato(id);
    fetchContatosData();
    setModalConfirmation(false);
  }

  async function editContato(id: string) {
    setLoading(true);
    await contatosStore.getUserId(id);
    setInitialContato(contatosStore.user);
    setModalEdit(true);
    setLoading(false);
  }

  return (
    <>
      <Container>
        <GridTemplate>
          <ContentLogo>
            <Logo>
              <img src={logo} alt="tela vazia" />
              <h1>Agenda BOT</h1>
            </Logo>
          </ContentLogo>
          <ContentSideNav>
            <SideNav>
              <NavLink to="/agendamentos">
                <h1>Agendamentos</h1>
              </NavLink>
              <NavLink to="/contatos">
                <h1>Contatos</h1>
              </NavLink>
              <NavLink to="/audios">
                <h1>Áudios</h1>
              </NavLink>
            </SideNav>
          </ContentSideNav>
          <ContentConteudo>
            <Row>
              <Search
                onChange={({ target: { value } }) =>
                  debounceQuery(value, handleSearch)
                }
              />
              <Button
                type="button"
                buttonSize="large"
                buttonType="primary"
                onClick={() => setModalAdd(true)}
              >
                Novo Contato
              </Button>
            </Row>
            {loading && <Loading />}

            {!loading && !contatosStore.contatosList?.data.length && <Empty />}

            {!loading && Boolean(contatosStore.contatosList?.data.length) && (
              <>
                <ContentContatosList>
                  {contatosStore.contatosList?.data
                    .sort((a, b) => a.firstName.localeCompare(b.firstName))
                    .map((contato: UserData) => (
                      <CardHorizontal
                        key={contato.id}
                        items={[
                          { title: 'Nome', content: contato.firstName },
                          { title: 'Telefone', content: contato.phone },
                          {
                            title: 'Total de Créditos',
                            content: contato.totalCredits ?? 0,
                          },
                        ]}
                        trash={() => {
                          setIdTo(contato.id);
                          setModalConfirmation(true);
                        }}
                        edit={async () => editContato(contato.id)}
                      />
                    ))}
                </ContentContatosList>
                <Pagination
                  currentPage={currentPage}
                  total={contatosStore.contatosList?.pageCount ?? 1}
                  onNextPage={e => setCurrentPage(e)}
                  onPrevPage={e => setCurrentPage(e)}
                />
              </>
            )}
          </ContentConteudo>
        </GridTemplate>
      </Container>
    </>
  );
}

export const Contatos = observer(ContatosComp);
