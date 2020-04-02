import Router from './router';

class RootStore {
  constructor() {
    this.router = new Router();
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
