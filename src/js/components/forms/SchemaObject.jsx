'use strict';

import React from 'react';
import _ from 'lodash';

import SchemaItem from './SchemaItem.jsx';

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
    return { value: {} };
  },

  componentWillMount() {
    this.state.value = this.props.value || {};
  },

  componentDidMount() {
  },

  componentDidUnmount() {
  },

  render() {
    let { name, schema, value, path, errors, ...other } = this.props;
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
        path={itemPath}
        value={value[name]}
        parentValue={value}
        schema={schema}
        error={error}
        {...other} />;
    });
    return (
      <div className="schema-form__item schema-form__item--object row row-wrap">
        {items}
      </div>
    );
  },

  _didChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  },

});

export default SchemaObject;

