'use strict';

import React from 'react';

let EntityTableHeader = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {};
  },

  render() {
    let columns = [];
    return (
      <thead>
        <tr>{columns}</tr>
      </thead>
    );
  },

});

export default EntityTableHeader;

