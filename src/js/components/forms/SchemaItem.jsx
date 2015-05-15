'use strict';

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
      return <SchemaChoice {...this.props} onChange={this._didChange} error={this.state.error} ref="item" />;
    } else {
      let SchemaText = require('./SchemaText.jsx');
      return <SchemaText {...this.props} onChange={this._didChange} error={this.state.error} ref="item" />;
    }
  },

  _makeNumber() {
    let SchemaNumber = require('./SchemaNumber.jsx');
    return <SchemaNumber {...this.props} onChange={this._didChange} error={this.state.error} ref="item" />;
  },

  _makeObject() {
    let SchemaObject = require('./SchemaObject.jsx');
    return <SchemaObject {...this.props} ref="item" onChange={this._didChange} />;
  },

  _makeArray() {
    if (this.props.schema.items.type === 'string') {
      let SchemaText = require('./SchemaText.jsx');
      return <SchemaText {...this.props} onChange={this._didChange} error={this.state.error} ref="item" />;
    } else {
      return <div>NOT YET IMPLEMENTED</div>
    }
  },

  _didChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

});

export default SchemaItem;
