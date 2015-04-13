'use strict';

let dispatcher = require('../dispatcher');

let EndpointAction = {

  addEndpoint(endpoint) {
    dispatcher.addEndpoint(endpoint);
  },

  updateEndpoint(endpoint) {
    dispatcher.updateEndpoint(endpoint);
  },

  selectEndpoint(endpoint) {
    dispatcher.selectEndpoint(endpoint);
  },

  removeEndpoint(endpoint) {
    dispatcher.removeEndpoint(endpoint);
  },

};

export default EndpointAction;
