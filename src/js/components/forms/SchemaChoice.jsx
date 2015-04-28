'use strict';

import _ from 'lodash';
import React from 'react';

import { FlatButton } from 'material-ui';
import i18n from '../../i18n';

let SchemaChoice = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
  },

  getValue() {
    return this.state.value;
  },

  render() {

    let value = this.state.value;
    let schema = this.props.schema;
    let labels = schema.enumLabels || schema.enum;

    let items = _.map(schema.enum, (key, i) => {
      let label = labels[i];
      if (value === key) {
        return (
          <div key={key} className="schema-form__item--choice__items__item">
            <FlatButton type="button" label={i18n(label)} primary={true} onClick={this._didCancel} />
          </div>
        );
      } else {
        return (
          <div key={key} className="schema-form__item--choice__items__item">
            <FlatButton type="button" label={i18n(label)} onClick={this._didClickItem(key)} />
          </div>
        );
      }
    });

    let error;
    if (this.props.error) {
      error = <div className="schema-form__item--choice__error">{i18n(this.props.error.message)}</div>;
    }

    return (
      <div className="schema-form__item schema-form__item--choice cols-12">
        <label>{i18n(this.props.name)}</label>
        <div className="schema-form__item--choice__items">{items}</div>
        {error}
      </div>
    );

  },

  _didClickItem(key) {
    return () => {
      this.setState({ value: key });
      if (this.props.onChange) {
        this.props.onChange(key);
      }
    };
  },

  _didCancel() {
    this.setState({ value: null });
  },

});

export default SchemaChoice;

