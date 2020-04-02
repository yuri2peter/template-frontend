import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import SuspenseLoad from './component/common/SuspenseLoad';
import configs from './configs';
import { getRootStore } from './util/common';

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
  return (
    <Router history={history}>
      <nav>
        <p>
          <Link to="/">/home</Link>
        </p>
        <p>
          <Link to="/test">/test</Link>
        </p>
        <p>
          <Link to="/test/test1">/test/test1</Link>
        </p>
      </nav>
      <Switch>
        <Route path="/test">
          <SuspenseLoad>{() => import('./page/Test')}</SuspenseLoad>
        </Route>
        <Route path="/">
          <SuspenseLoad>{() => import('./page/Home')}</SuspenseLoad>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
