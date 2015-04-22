'use strict';

import dispatcher from '../dispatcher';
import APIClient from '../services/APIClient';
import i18n from '../i18n';

export function getConfig(callback) {

  APIClient.get('/config', (err, config) => {

    if (err) {
      dispatcher.notifyError(err);
    } else {
      dispatcher.setConfig(config);
      dispatcher.setTitle(i18n('site.title'));
      callback();
    }

  });

}
