'use strict';

import events from 'events';

let dispatcher = {};

let emitter = new events.EventEmitter();
[
  'login',
  'logout',

  // App
  'setTitle',
  'expandTitle',

  // Endpoint
  'addEndpoint',
  'updateEndpoint',
  'selectEndpoint',
  'removeEndpoint',

  // Entity
  'setEntityItems',
  'updateEntityField',

  // Config
  'setConfig',

  // Authorize
  'setAuthConfig',
  'setAuthUser',
  'setAuthToken',
  'setAuthFail',

  // Notify error
  'notifyError',
  'notifyInfo',

].map(name => {

  let dispatch = function() {
    let args = Array.prototype.slice.apply(arguments);
    args.unshift(name);
    emitter.emit.apply(emitter, args);
  };

  dispatch.on = handler => {
    emitter.on(name, handler);
  };

  dispatch.off = handler => {
    emitter.removeListener(name, handler);
  };

  dispatcher[name] = dispatch;

});

dispatcher.on = (listeners) => {
  for (let name in listeners) {
    if (dispatcher[name]) {
      dispatcher[name].on(listeners[name]);
    } else {
      console.warn(name + ' is not in dispatcher');
    }
  }
};

export default dispatcher;

