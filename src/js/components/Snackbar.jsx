'use strict';

import React from 'react';
import SnackbarStore from '../stores/SnackbarStore';
import i18n from '../i18n';

import { Snackbar } from 'material-ui';

let AppSnackbar = React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
    SnackbarStore.addListener(this._setState);
  },

  componentWillUnmount() {
    SnackbarStore.removeListener(this._setState);
  },

  _setState(state) {
    if (state.error) {
      let msg = state.error.message || state.error;
      this.setState({ message: msg, snackClass: 'error' });
      this.refs.snackbar.show();
    } else if (state.info) {
      this.setState({ message: state.message, snackClass: 'info' });
      this.refs.snackbar.show();
    }
  },

  render() {
    return <Snackbar
      ref="snackbar"
      message={i18n(this.state.message)}
      className={this.state.snackClass} />;
  }
});

export default AppSnackbar;

