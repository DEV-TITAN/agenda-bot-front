import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { observer } from 'mobx-react';
import * as React from 'react';

import GlobalStyle from '../styles/global';
import { Routes } from './routes';

export function AppComp() {
  return (
    <>
      <React.Suspense fallback={null}>
        <Routes />
      </React.Suspense>
      <GlobalStyle />
    </>
  );
}

export const App = observer(AppComp);
