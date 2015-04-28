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

      let key = field.id.split('.').pop();

      return <div
        className="entity__table__header__column"
        key={field.id}
        style={field.style}>{i18n(key)}</div>;
    });

    return (
      <div className='entity__table__header'>
        {columns}
        <div key="control" className='entity__table__header__column entity__table__header__column--control'></div>
      </div>
    );
  },

});

export default EntityTableHeader;

