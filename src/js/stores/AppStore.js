'use strict';

import BaseStore from './BaseStore';

/**
 * EndpointStore stores endpoints to localStorage
 */
class AppStore extends BaseStore {

  constructor() {
    super();
    this.state = {
      title: "React Manager"
    };
  }

  registerDispatcher(dispatcher) {
    dispatcher.setAppTitle.on((title) => {
      this.state.title = title;
      this.emit();
    });
  }

}

export default new AppStore();
