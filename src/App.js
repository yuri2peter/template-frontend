import React from 'react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import configs from './configs';
import { getRootStore } from './util/common';
import Page from './page/Index';

function getHistory(routerHistoryType) {
  if (routerHistoryType === 'hash')
    return require('history').createHashHistory();
  if (routerHistoryType === 'memory')
    return require('history').createMemoryHistory();
  return require('history').createBrowserHistory();
}

const routingStore = new RouterStore();
const plainHistory = getHistory(configs.routerHistoryType);
const history = syncHistoryWithStore(plainHistory, routingStore);
const rootStore = getRootStore();

rootStore.router.setHistory(history);

function App() {
  return <Page history={history} />;
}

export default App;
