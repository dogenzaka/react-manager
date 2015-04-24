'use strict';

import React from 'react';
import i18n from '../../i18n';

import RowMenu from '../RowMenu.jsx';

let EntityTableRow = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
    item: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.item === this.props.item;
  },

  componentWillMount() {
  },

  render() {

    let item = this.props.item;
    let fields = this.props.fields;

    let columns = fields.map(field => {
      let value = item[field.id];
      return <td key={field.id} style={field.style}>{value}</td>;
    });

    let controlItems = [
      { payload: item, text: i18n('Edit'), iconClassName: 'md-edit md-15x' },
      { payload: item, text: i18n('Delete'), iconClassName: 'md-delete md-15x' },
    ];

    return (
      <tr>
        {columns}
        <td className="entity__control">
        </td>
      </tr>
    );
  },

  _didClickRowMenu() {
  },

});

export default EntityTableRow;

