'use strict';

import BaseStore from './BaseStore';

/**
 * EndpointStore stores endpoints to localStorage
 */
class AppStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    return {};
  }

}

export default new AppStore();
