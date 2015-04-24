'use strict';

import BaseStore from './BaseStore';
import _ from 'lodash';

/**
 * EntityStore
 */
class EntityStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    return {};
  }

  setEntityItems(result) {
    this.setState(result);
  }

}

export default new EntityStore();


