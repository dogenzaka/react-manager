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
      value: this.props.value,
      error: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
    this.state.error = props.error;
  },

  getValue() {
    return this.state.value;
  },

  render() {

    let value = this.state.value;
    let schema = this.props.schema;
    let labels = schema.enumLabels || schema.enum;
    let cols = schema.cols || 12;

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
    if (this.state.error) {
      error = <div className="schema-form__item--choice__error">{i18n(this.state.error.message)}</div>;
    }

    let className = "schema-form__item schema-form__item--choice cols-" + cols;
    if (this.props.mini) {
      className += " schema-form__item--choice--mini";
    }

    return (
      <div className={className}>
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
        setTimeout(() => {
          this.props.onChange(key);
        }, 0);
      }
    };
  },

  _didCancel() {
    this.setState({ value: null });
    if (this.props.onChange) {
      setTimeout(() => {
        this.props.onChange(null);
      }, 0);
    }
  },

});

export default SchemaChoice;

