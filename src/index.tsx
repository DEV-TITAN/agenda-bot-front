import * as Sentry from '@sentry/browser';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import dayjs from 'dayjs';
import localeDayjs from 'dayjs/locale/pt-br';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';
import rootStore from './stores/RootStore';

dayjs.locale(localeDayjs);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Router history={rootStore.history}>
        <ConfigProvider locale={ptBR}>
          <App />
        </ConfigProvider>
      </Router>
    </React.StrictMode>,

    document.getElementById('root') ?? document.createElement('div'), // Creating element for testing purposes.
  );
}

render();
