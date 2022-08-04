// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Agendamentos } from '../containers/Agendamentos';
import { Audios } from '../containers/Audios';
import { Contatos } from '../containers/Contatos';
import { Sidenav } from '../shared/components/Sidenav';
import { Login } from '../shared/containers/Login';
import { useStores } from '../stores/RootStore';
import { Container, Content } from './style';

import QRCode from 'qrcode';

function RoutesComp() {
  const { authStore } = useStores();

  if (authStore.isUserLoggedIn) {

  const [qrcodeImage, setQrcodeImage] = useState([]);
  const [listening, setListening] = useState(false);
      useEffect(() => {
      if (!listening) {
        const events = new EventSource('http://localhost:3001/events');

        events.onmessage = event => {
          const parsedData = JSON.parse(event.data);

          QRCode.toDataURL(parsedData, (err, url) => {
            console.log(url);
          });
          setQrcodeImage(qrcodeImage.concat(parsedData));
        };

        setListening(true);
        }

  }, [listening, qrcodeImage]);
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
