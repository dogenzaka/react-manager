'use strict';

import _ from 'lodash';
import React from 'react';

import { FlatButton } from 'material-ui';
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

    let value = String(this.state.value);
    let schema = this.props.schema;
    let labels = ['true', 'false'];
    let cols = schema.cols || 12;

    let items = _.map(labels, (key, i) => {
      let label = labels[i];
      if (value === key) {
        return (
          <div key={key} className="schema-form__item--boolean__items__item">
            <FlatButton type="button" label={i18n(label)} primary={true} onClick={this._didCancel} />
          </div>
        );
      } else {
        return (
          <div key={key} className="schema-form__item--boolean__items__item">
            <FlatButton type="button" label={i18n(label)} onClick={this._didClickItem(key)} />
          </div>
        );
      }
    });

    let error;
    if (this.state.error) {
      error = <div className="schema-form__item--boolean__error">{i18n(this.state.error.message)}</div>;
    }

    let className = "schema-form__item schema-form__item--boolean cols-" + cols;
    if (this.props.mini) {
      className += " schema-form__item--boolean--mini";
    }

    return (
      <div className={className}>
        <label>{i18n(this.props.name)}</label>
        <div className="schema-form__item--boolean__items">{items}</div>
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

export default SchemaBoolean;
