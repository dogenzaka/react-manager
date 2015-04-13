'use strict';

import events from 'events';

let emitter = new events.EventEmitter();
[
  'login',
  'logout',

  // App
  'setAppTitle',

  // Endpoint
  'addEndpoint',
  'updateEndpoint',
  'selectEndpoint',
  'removeEndpoint',

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

  exports[name] = dispatch;

});

exports.on = (listeners) => {
  for (let name in listeners) {
    exports[name] = listeners[name];
  }
};

