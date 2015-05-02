'use strict';

import React from 'react';
import i18n from '../../i18n';

import { TextField } from 'material-ui';
import { ValidateMixin } from './SchemaMixin';

let SchemaNumber = React.createClass({

  mixins: [ValidateMixin],

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return {
      value: this.props.value,
      error: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    if ('value' in props) {
      this.state.value = Number(props.value);
    } else {
      this.state.value = undefined;
    }
    this.state.error = props.error;
  },

  getValue() {
    let value = this.refs.text.getValue();
    if (value.length > 0 && /^[0-9]+$/.test(value)) {
      return Number(value);
    }
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let value = this.state.value;

    let floatingText;
    let hintText;

    if (this.props.mini) {
      hintText = i18n(this.props.name);
    } else {
      hintText = i18n(schema.hint);
      floatingText = i18n(this.props.name);
    }

    return (
      <div className="schema-form__item schema-form__item--number">
        <TextField
          type="number"
          ref="text"
          hintText={hintText}
          errorText={error && error.message}
          value={value}
          floatingLabelText={floatingText}
          onChange={this.validate} />
      </div>
    );
  },

});

export default SchemaNumber;

