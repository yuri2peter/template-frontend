import EventEmitter from 'events';

import Router from './router';
import WebSocket from './webSocket';

class RootStore {
  constructor() {
    this.event = new EventEmitter();
    this.router = new Router();
    this.webSocket = new WebSocket();
  }
}

RootStore.init = (...params) => {
  const { singleInstance } = RootStore;
  if (singleInstance) return;
  RootStore.singleInstance = new RootStore(...params);
};

RootStore.getSingleInstance = () => {
  return RootStore.singleInstance;
};

export default RootStore;
