'use strict';

import React from 'react';
import tv4 from 'tv4';

let SchemaItem = React.createClass({

  propTypes: {
    form: React.PropTypes.object,
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.any,
    parentValue: React.PropTypes.object,
    depth: React.PropTypes.number,
    cols: React.PropTypes.number,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
    errors: React.PropTypes.array,
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
    return <SchemaObject {...this.props} ref="item" />;
  },

  _makeArray() {
    return <div>NOT YET IMPLEMENTED</div>;
  },

  _didChange(value) {
    if (tv4.validate(value, this.props.schema)) {
      this.setState({ error: null });
    } else {
      this.setState({ error: tv4.error });
    }
  },

});

export default SchemaItem;
