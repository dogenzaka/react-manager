'use strict';

import BaseStore from './BaseStore';

/**
 * HeaderStore stores information for application header
 */
class HeaderStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    return { title: '' };
  }

  setTitle(title) {
    this.setState({ title: title });
  }

  expandTitle(expansion) {
    this.setState({ expanded: expansion });
  }

}

export default new HeaderStore();

