// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Agendamentos } from '../containers/Agendamentos';
import { Audios } from '../containers/Audios';
import { Contatos } from '../containers/Contatos';
import { Sidenav } from '../shared/components/Sidenav';
import { Login } from '../shared/containers/Login';
import { useStores } from '../stores/RootStore';
import { Container, Content } from './style';

function RoutesComp() {
  const { authStore } = useStores();

  if (authStore.isUserLoggedIn) {
    return (
      <Switch>
        <Container>
          <Sidenav />
          <Content>
            <Route path="/agendamentos" component={Agendamentos} />
            <Route path="/contatos" component={Contatos} />
            <Route path="/audios" component={Audios} />
          </Content>
        </Container>
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Route path="*" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </BrowserRouter>
  );
}

export const Routes = observer(RoutesComp);
