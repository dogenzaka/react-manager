'use strict';

import BaseStore from './BaseStore';

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

  updateEntityField(spec, field, item, value) {
    // Update item value
    item[field.id] = value;
    this.setState({
      spec: spec,
      field: field,
      item: item,
      value: value
    });
  }

}

export default new EntityStore();


