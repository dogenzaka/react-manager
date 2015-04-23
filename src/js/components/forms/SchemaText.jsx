'use strict';

import React from 'react';
import mui from 'material-ui';
import i18n from '../../i18n';

let { TextField } = mui;

let SchemaText = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.state.value = this.props.value;
  },

  componentWillReceiveProps() {
    this.state.value = this.props.value;
  },

  getValue() {
    return this.refs.text.getValue();
  },

  render() {

    let schema = this.props.schema;
    let error = this.props.error;
    let cols = schema.cols || 12;
    let type = 'text';
    if (schema.format === 'password') {
      type = 'password';
    }

    return (
      <div className={"schema-form__item schema-form__item--text cols-"+cols}>
        <TextField
          ref="text"
          type={type}
          hintText={i18n(schema.hint)}
          errorText={error && error.message}
          defaultValue={this.state.value}
          floatingLabelText={i18n(this.props.name)}
        />
      </div>
    );
  },

  _didChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  },

});

export default SchemaText;

