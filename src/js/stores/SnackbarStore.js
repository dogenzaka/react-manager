'use strict';

import BaseStore from './BaseStore';

/**
 * Snackbar notifies messages to screen
 */
class SnackbarStore extends BaseStore {

  constructor() {
    super();
  }

  notifyError(err) {
    this.setState({ error: err });
  }

  notifyInfo(message) {
    this.setState({ info: message });
  }

  setAuthFail(err) {
    this.error(err);
  }

}

export default new SnackbarStore();
