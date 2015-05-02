'use strict';

import React from 'react';
import i18n from '../../i18n';

import { TextField } from 'material-ui';
import { ValidateMixin } from './SchemaMixin';

let SchemaText = React.createClass({

  mixins: [ValidateMixin],

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: this.props.value,
      errors: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
    this.state.error = props.error;
  },

  getValue() {
    return this.refs.text.getValue();
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let cols = schema.cols || 12;
    let type = 'text';
    if (schema.format === 'password') {
      type = 'password';
    }
    let floatingText;
    let hintText;

    if (this.props.mini) {
      hintText = i18n(this.props.name);
    } else {
      hintText = i18n(schema.hint);
      floatingText = i18n(this.props.name);
    }

    return (
      <div className={"schema-form__item schema-form__item--text cols-"+cols}>
        <TextField
          type={type}
          ref="text"
          hintText={hintText}
          errorText={error && error.message}
          value={this.state.value}
          floatingLabelText={floatingText}
          onChange={this.validate} />
      </div>
    );
  },

});

export default SchemaText;

