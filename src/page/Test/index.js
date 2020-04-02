import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Test1 from './Test1';

export default () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1>Test</h1>
      <Switch>
        <Route path={`${match.path}/test1`}>
          <Test1 />
        </Route>
      </Switch>
    </div>
  );
};
