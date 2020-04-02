import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Demo1 from './Demo1';
import Demo2 from './Demo2';

export default () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1>Demo</h1>
      <Switch>
        <Route path={`${match.path}/demo1`}>
          <Demo1 />
        </Route>
        <Route path={`${match.path}/demo2`}>
          <Demo2 />
        </Route>
      </Switch>
    </div>
  );
};
