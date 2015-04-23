'use strict';

import React from 'react';
import i18n from '../../i18n';

let EntityTableBody = React.createClass({

  propTypes: {
    spec: React.PropTypes.object
  },

  getInitialState() {
    return {};
  },

  render() {
    let rows = [];
    return (
      <tbody>{rows}</tbody>
    );
  },

});

export default EntityTableBody;

