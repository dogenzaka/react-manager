'use strict';

let dispatcher = require('../dispatcher');

let AppAction = {

  setTitle(title) {
    dispatcher.setAppTitle(title);
  },

};

export default AppAction;

