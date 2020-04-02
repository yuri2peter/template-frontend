import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RootStore from './store/root';

RootStore.init();
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.Suspense fallback={null}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
