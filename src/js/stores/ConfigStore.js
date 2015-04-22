'use strict';

import BaseStore from './BaseStore';
import i18n from '../i18n';
import _ from 'lodash';

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
    this.setState({ config: config });
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
