
import _ from 'lodash';
import dispatcher from '../dispatcher';

export default class BaseStore {

  /**
   * Init with constructor
   */
  constructor() {
    this.state = this.getInitialState();
    this.listeners = [];
    // register to dispatcher
    _.each(dispatcher, (register, name) => {
      let method = this[name];
      if (method && typeof method === 'function') {
        register.on(method.bind(this));
      }
    });
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
  dispatch() {
    return {};
  }

  /**
   * Set state and emit change event
   */
  setState(state) {
    // overwrite current state
    _.each(state, (v, k) => {
      this.state[k] = v;
    });
    // emit changes
    this.emit(state);
  }

  /**
   * Emit change event
   */
  emit(state) {
    // emit full state if not specified
    state = state || this.state;
    _.each(this.listeners, listener => listener(state));
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

