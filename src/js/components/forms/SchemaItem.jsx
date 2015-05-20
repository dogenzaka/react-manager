'use strict';

import _ from 'lodash';
import React from 'react';

let SchemaItem = React.createClass({

  propTypes: {
    form: React.PropTypes.object,
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.any,
    depth: React.PropTypes.number,
    cols: React.PropTypes.number,
    mini: React.PropTypes.bool,
    error: React.PropTypes.object,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.state.error = this.props.error;
  },

  componentWillReceiveProps(props) {
    this.state.error = props.error;
  },

  getValue() {
    return this.refs.item.getValue();
  },

  render() {
    return this._makeItem();
  },

  getChildProps() {
    return _.pick(this.props, 'name','value','schema','cols','mini');
  },

  /**
   * Make schema item
   */
  _makeItem() {
    let schema = this.props.schema;
    switch (schema.type) {
      case 'string':
        return this._makeString();
      case 'number':
        return this._makeNumber();
      case 'object':
        return this._makeObject();
      case 'array':
        return this._makeArray();
      default:
        throw "Unsupported schema type " + schema.type;
    }
  },

  _makeString() {
    if (this.props.schema.enum) {
      let SchemaChoice = require('./SchemaChoice.jsx');
      return <SchemaChoice
        {...this.getChildProps()}
        onChange={this._didChange}
        onSubmit={this._didSubmit}
        error={this.state.error}
        ref="item" />;
    } else if (this.props.schema.format === 'datetime') {
      let SchemaDateTime = require('./SchemaDateTime.jsx');
      return <SchemaDateTime
        {...this.getChildProps()}
        onChange={this._didChange}
        onSubmit={this._didSubmit}
        error={this.state.error}
        ref="item" />;
    } else if (this.props.schema.format === 'date') {
      let SchemaDate = require('./SchemaDate.jsx');
      return <SchemaDate
        {...this.getChildProps()}
        onChange={this._didChange}
        onSubmit={this._didSubmit}
        error={this.state.error}
        ref="item" />;
    } else {
      let SchemaText = require('./SchemaText.jsx');
      return <SchemaText
        {...this.getChildProps()}
        onChange={this._didChange}
        onSubmit={this._didSubmit}
        error={this.state.error}
        ref="item" />;
    }
  },

  _makeNumber() {
    let SchemaNumber = require('./SchemaNumber.jsx');
    return <SchemaNumber
      {...this.getChildProps()}
      onSubmit={this._didSubmit}
      onChange={this._didChange}
      error={this.state.error}
      ref="item" />;
  },

  _makeObject() {
    let SchemaObject = require('./SchemaObject.jsx');
    return <SchemaObject
      {...this.getChildProps()}
      onChange={this._didChange}
      onSubmit={this._didSubmit}
      error={this.state.error}
      ref="item"
      />;
  },

  _makeArray() {
    if (this.props.schema.items.type === 'string') {
      let SchemaArrayText = require('./SchemaArrayText.jsx');
      return <SchemaArrayText {...this.props} onChange={this._didChange} error={this.state.error} ref="item" />;
    } else {
      return <div>NOT YET IMPLEMENTED</div>;
    }
  },

  _didChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  _didSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  },

});

export default SchemaItem;
