'use strict';

import BaseStore from './BaseStore';

/**
 * EndpointStore stores endpoints to localStorage
 */
class AppStore extends BaseStore {

  constructor() {
    super();
    window.onresize = this._resize;
  }

  getInitialState() {
    return {
      size: { width: window.innerWidth, height: window.innerHeight }
    };
  }

  _resize() {
    this.setState({
      size: { width: window.innerWidth, height: window.innerHeight }
    });
  }

}

export default new AppStore();
