'use strict';

import BaseStore from './BaseStore';
import i18n from '../i18n';
import _ from 'lodash';

import EntitySpec from '../services/EntitySpec';

class ConfigStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    return {
      config: null,
    };
  }

  selectEndpoint() {
    this.reset();
  }

  setConfig(config) {
    console.info('Update config', config);
    if (config.i18n) {
      _.each(config.i18n, (resources, lang) => {
        i18n.merge(resources, lang);
      });
    }
    this._normalize(config);
    this.setState({ config: config });
  }

  getEntitySpec(id) {
    let entityConfig = _.find(this.state.config.entities, entity => entity.id === id);
    if (entityConfig) {
      return new EntitySpec(entityConfig);
    }
  }

  _normalize(config) {
    _.each(config.entities, entity => {
      let features = entity.features = entity.features || {};
      let list = features.list = features.list || {};
      // Default is first 5 properties
      list.fields = list.fields || _.map(entity.schema.properties, (v,k) => k).slice(0,5);

      list.fields = list.fields.map(
        field =>
        (typeof field === 'string') ? { id: field } : field);
    });
  }

  logout() {
    this.reset();
  }

  /**
   * Return true when config is loaded
   */
  hasConfig() {
    return !!this.state.config;
  }

  /**
   * Reset configuration for current endpoint
   */
  reset() {
    this.setState({ config: null });
  }
}

export default new ConfigStore();
