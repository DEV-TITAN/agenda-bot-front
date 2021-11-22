import { observer } from 'mobx-react';
import React from 'react';
import {
  SidenavContainer,
  Item,
  Logo,
  SidenavContent,
  Items,
  Footer,
} from './style';
import logo from '../../../assets/logo.png';
import { useStores } from '../../../stores/RootStore';

function SidenavComp() {
  const { authStore } = useStores();

  const menuOptions = [
    {
      key: 'agendamentos',
      main: { label: 'Agendamentos >', path: '/agendamentos' },
    },
    {
      key: 'contatos',
      main: { label: 'Contatos >', path: '/contatos' },
    },
    {
      key: 'audios',
      main: { label: 'Áudios >', path: '/audios' },
    },
  ];

  function logout() {
    authStore.logout();
    window.location.reload();
  }

  return (
    <SidenavContainer>
      <Logo>
        <img src={logo} alt="agenda Bot" />
        <h1>Agenda BOT</h1>
      </Logo>
      <SidenavContent>
        <Items>
          {menuOptions.map(option => (
            <Item key={option.key} to={option.main.path}>
              {option.main.label}
            </Item>
          ))}
        </Items>

        <Footer onClick={logout}>
          <p>SAIR</p>
        </Footer>
      </SidenavContent>
    </SidenavContainer>
  );
}

export const Sidenav = observer(SidenavComp);
