'use strict';

import React from 'react';
import _ from 'lodash';

import i18n from '../../i18n';
import { Theme } from '../../styles';

let EntityTableHeader = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {};
  },

  render() {

    let styles = {
      header: {
        display: 'flex',
        position: 'fixed',
        flexDirection: 'row',
        alignItems: 'stretch',
        fontWeight: 'bold',
        lineHeight: '40px',
        color: Theme.palette.textSecondColor,
        borderBottom: '1px solid ' + Theme.palette.borderColor,
        background: '#fff',
        zIndex: 2,
        width: 'calc(100% - 132px)',
      },
      column: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flex: 4,
        padding: '0 2px 0 8px',
      },
    };

    let spec = this.props.spec;
    let columns = spec.features.list.fields.map(field => {

      let key = field.id.split('.').pop();
      let style = _.extend({}, styles.column, field.style);

      return <div
        key={field.id}
        style={style}>{i18n(key)}</div>;
    });

    return (
      <div style={styles.header}>
        {columns}
        <div key="control" style={_.extend({
          maxWidth: '48px', minWidth: '48px',
        }, styles.column)} />
      </div>
    );
  },

});

export default EntityTableHeader;

