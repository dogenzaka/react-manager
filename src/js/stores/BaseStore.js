
import _ from 'lodash';
import dispatcher from '../dispatcher';

export default class BaseStore {

  /**
   * Init with constructor
   */
  constructor() {
    this.state = this.getInitialState();
    this.listeners = [];
    this.registerDispatcher(dispatcher);
  }

  /**
   * Get inital state of thie store
   */
  getInitialState() {
    return {};
  }

  /**
   * Register event listener to dispacher
   */
  registerDispatcher() {
  }

  /**
   * Emit change event
   */
  emit() {
    _.each(this.listeners, listener => listener(this.state));
  }

  /**
   * Register listener for change event
   */
  addListener(listener) {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener);
    }
  }

  /**
   * Unregister change listener
   * @param Function listener
   */
  removeListener(listener) {
    let index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

}

