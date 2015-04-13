'use strict';

import BaseStore from './BaseStore';

/**
 * EndpointStore stores endpoints to localStorage
 */
class FloatingMenuStore extends BaseStore {

  constructor() {
    super();
  }

  registerDispatcher(dispatcher) {
    // Register to dispatcher
    dispatcher.activateFloatingMenu(opts => {
      this.activate(opts);
    });
  }

}

export default new FloatingMenuStore();
