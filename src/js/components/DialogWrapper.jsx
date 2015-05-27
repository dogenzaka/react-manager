'use strict';

import React from 'react';
import { Dialog } from 'material-ui';
import { Theme } from '../styles';

class DialogWrapper extends React.Component {

  getChildContext() {
    return {
      muiTheme: Theme
    };
  }

  show() {
    this.refs.dialog.show();
  }

  dismiss() {
    this.refs.dialog.dismiss();
  }

  render() {
    return (
      <Dialog {...this.props} ref="dialog" />
    );
  }

}

DialogWrapper.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default DialogWrapper;

