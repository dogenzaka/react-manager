'use strict';

import React from 'react';
import { Styles } from 'material-ui';

let ChildContextMixin = {

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: Styles.ThemeManager().getCurrentTheme()
    };
  },

};

export default ChildContextMixin;
