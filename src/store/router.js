import { observable } from 'mobx';

export default class Router {
  @observable path = '/';

  setHistory(history) {
    if (this.history) return;
    this.history = history;
    this.history.subscribe((location, action) => {
      this.path = location.pathname; // @action
    });
  }

  redirect(path) {
    this.history && this.history.push(path);
  }
}
