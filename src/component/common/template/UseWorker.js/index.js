import React, { useEffect } from 'react';
import PromiseWorker from 'promise-worker';
import MyWorker from './index.worker';

export default () => {
  useEffect(() => {
    const promiseWorker = new PromiseWorker(new MyWorker());
    promiseWorker.postMessage('params').then();
  }, []);
  return <></>;
};
