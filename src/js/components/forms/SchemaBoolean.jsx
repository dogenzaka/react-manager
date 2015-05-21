'use strict';

import _ from 'lodash';
import React from 'react';

import { Toggle } from 'material-ui';
import i18n from '../../i18n';

let SchemaBoolean = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object.isRequired,
    value: React.PropTypes.boolean,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: this.props.value,
      error: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
    this.state.error = props.error;
  },

  getValue() {
    return Boolean(this.state.value);
  },

  render() {

    let value = this.state.value;
    let schema = this.props.schema;
    let cols = schema.cols || 12;

    let className = "schema-form__item schema-form__item--boolean cols-" + cols;
    if (this.props.mini) {
      className += " schema-form__item--boolean--mini";
    }

    return (
      <div className={className}>
        <label>{i18n(this.props.name)}</label>
        <div className="schema-form__item--boolean__items">
          <Toggle toggled={value} onToggle={this._didToggle()} />
        </div>
      </div>
    );

  },

  _didToggle() {
    return () => {
      let _value = !this.state.value
      this.setState({ value: _value });
      if (this.props.onChange) {
        setTimeout(() => {
          this.props.onChange(_value);
        }, 0);
      }
    };
  },

});

export default SchemaBoolean;
