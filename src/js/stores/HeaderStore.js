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
    return { title: '', subTitle: '' };
  }

  setTitle(title) {
    this.setState({ title: title, subTitle: '' });
  }

  setSubTitle(title) {
    this.setState({ title: '', subTitle: title });
  }

}

export default new HeaderStore();

