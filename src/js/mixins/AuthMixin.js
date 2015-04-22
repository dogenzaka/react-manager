'use strict';

import { getUser } from '../actions/AuthAction';
import { getConfig } from '../actions/ConfigAction';

import AuthStore from '../stores/AuthStore';
import EndpointStore from '../stores/EndpointStore';
import ConfigStore from '../stores/ConfigStore';

let AuthMixin = {

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      if (!EndpointStore.getActiveEndpoint()) {
        transition.redirect('endpoints');
        callback();
        return;
      }
      // Check token
      if (!AuthStore.hasToken()) {
        transition.redirect('login');
        callback();
        return;
      }
      // Check authorized
      if  (!AuthStore.hasUser()) {
        getUser(function() {
          getConfig(callback);
        });
        return;
      }
      // Check configuration
      if (!ConfigStore.hasConfig()) {
        getConfig(callback);
        return;
      }
      // Alraedy authorized
      callback();
    }
  },

};

export default AuthMixin;
