import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import SuspenseLoad from '../component/common/SuspenseLoad';

function Page({ history }) {
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
          <SuspenseLoad>{() => import('./Test')}</SuspenseLoad>
        </Route>
        <Route path="/">
          <SuspenseLoad>{() => import('./Home')}</SuspenseLoad>
        </Route>
      </Switch>
    </Router>
  );
}

export default Page;
