'use strict';

import React from 'react';
import _ from 'lodash';
import i18n from '../../i18n';

import SchemaItem from './SchemaItem.jsx';
import { Theme } from '../../styles';

let SchemaObject = React.createClass({

  propTypes: {
    form: React.PropTypes.object,
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.any,
    parentValue: React.PropTypes.object,
    depth: React.PropTypes.number,
    onChange: React.PropTypes.func,
    errors: React.PropTypes.array,
  },

  getInitialState() {
    return { value: this.props.value || {} };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
  },

  getValue() {
    let items = this.state.items || [];
    let value = {};
    _.each(items, item => {
      let comp = this.refs[item.key];
      if (comp) {
        value[item.key] = comp.getValue();
      }
    });
    return value;
  },

  render() {
    let { name, schema, value, path, errors, depth } = this.props;
    value = value || {};
    depth = depth || 0;
    let items = _.map(schema.properties, (schema, name) => {
      let itemPath = path + '/' + name;
      let error;
      _.each(errors, err => {
        let dataPath = err.dataPath;
        let dataKey = err.params && err.params.key;
        // required error
        if (err.code === 302 && dataPath === path && dataKey === name) {
          error = err;
        } else if (err.dataPath === itemPath) {
          error = err;
        }
      });
      return <SchemaItem
        name={name}
        key={name}
        ref={name}
        path={itemPath}
        value={value[name]}
        parentValue={value}
        schema={schema}
        depth={depth+1}
        error={error}
        mini={this.props.mini}
        onChange={this._didChange}
        onSubmit={this._didSubmit} />;
    });
    this.state.items = items;

    let styles = {
      object: {
        position: 'relative',
        margin: '10px 0 0 0',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      },
      title: {
        color: Theme.palette.textSecondColor,
        position: 'absolute',
        background: '#fff',
        top: '-8px',
        left: '-4px',
        padding: '4px',
      },
    };
    if (depth > 0) {
      styles.object.borderLeft = '1px solid ' + Theme.palette.borderColor;
    }

    return (
      <div style={styles.object}>
        <div style={styles.title}>{i18n(name)}</div>
        {items}
      </div>
    );
  },

  _didChange() {
    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  },

  _didSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  },

});

export default SchemaObject;

