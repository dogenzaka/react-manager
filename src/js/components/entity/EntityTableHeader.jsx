'use strict';

import React from 'react';

import i18n from '../../i18n';

let EntityTableHeader = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {};
  },

  render() {

    let spec = this.props.spec;
    let columns = spec.features.list.fields.map(field => {
      return <th key={field.id} style={field.style}>{i18n(field.id)}</th>;
    });

    return (
      <thead>
        <tr>
          {columns}
          <th key="control" className='entity__control'></th>
        </tr>
      </thead>
    );
  },

});

export default EntityTableHeader;

