import configs from 'src/configs';
import { observable } from 'mobx';
import io from 'socket.io-client';

class WebSocket {
  constructor() {
    this.connect();
    this.bindTest();
  }

  callbacks = [];
  callbackBindIndex = 0;
  @observable connected = false;

  connect() {
    const { urlWebSocket } = configs;
    if (!urlWebSocket) return;
    const socket = io(urlWebSocket);
    this.socket = socket;
    socket.on('connect', () => {
      this.connected = true;
      console.log('Websocket connected.');
    });
    socket.on('reconnect', () => {
      this.connected = true;
      console.log('Websocket reconnected.');
      this.update();
    });
    socket.on('message', ({ type, data }, fn) => {
      this.callbacks
        .filter((t) => t.type === type)
        .forEach((t) => t.callback(data));
      fn && fn();
    });
    socket.on('disconnect', () => {
      this.connected = false;
      this.socketId = '';
      console.log('Websocket disconnected.');
    });
  }

  bindEvent(type, callback) {
    this.callbackBindIndex += 1;
    const id = this.callbackBindIndex;
    this.callbacks.push({
      id,
      type,
      callback,
    });
    const removeBind = () => {
      this.callbacks = this.callbacks.filter((t) => t.id !== id);
    };
    return removeBind;
  }

  bindTest() {
    this.bindEvent('test', (data) => {
      console.log('WebSocket test event recieved: ', data);
    });
  }
}

export default WebSocket;
