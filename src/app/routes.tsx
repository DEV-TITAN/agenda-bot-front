// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from '../shared/containers/Login';
import { useStores } from '../stores/RootStore';

function RoutesComp() {
  const { authStore } = useStores();

  if (authStore.isUserLoggedIn) {
    return (
      <Switch>
        {/* menu */}
        {/* corpo */}
        <Route path="/agendamentos" />
        <Route path="/contatos" />
        <Route path="/audios" />
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
