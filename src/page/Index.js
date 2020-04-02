import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import SuspenseLoad from '../component/common/SuspenseLoad';

function Page({ history }) {
  return (
    <Router history={history}>
      <ul>
        <li>
          <Link to="/">/home</Link>
        </li>
        <li>
          <Link to="/demo">/demo</Link>
        </li>
        <li>
          <Link to="/demo/demo1">/demo/demo1</Link>
        </li>
        <li>
          <Link to="/demo/demo2">/demo/demo2</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/demo">
          <SuspenseLoad>{() => import('./Demo')}</SuspenseLoad>
        </Route>
        <Route path="/">
          <SuspenseLoad>{() => import('./Home')}</SuspenseLoad>
        </Route>
      </Switch>
    </Router>
  );
}

export default Page;
