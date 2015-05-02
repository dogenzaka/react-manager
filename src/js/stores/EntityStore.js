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
    return { showSearch: false };
  }

  setEntityItems(result) {
    this.setState({
      type: 'list',
      list: result.list,
      offset: result.offset,
      query: result.query,
    });
  }

  updateEntityField(spec, item, field, value) {
    // Update item value
    item[field.id] = value;
    this.setState({
      type: 'updateField',
      spec: spec,
      field: field,
      item: item,
      value: value
    });
  }

  updateEntity(spec, item) {
    this.setState({ type: 'update', spec: spec, item: item });
  }

  updateEntityFail(spec, error) {
    this.setState({ type: 'updateFail', spec: spec, error: error });
  }

  removeEntity(spec, item) {
    this.setState({ type: 'remove', spec: spec, item: item });
  }

  toggleEntitySearch() {
    this.setState({ showSearch: !this.state.showSearch });
  }

}

export default new EntityStore();


