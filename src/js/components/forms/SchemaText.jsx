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

  render() {

    let schema = this.props.schema;
    let error = this.props.error;
    let cols = schema.cols || 12;

    return (
      <div className={"schema-form__item schema-form__item--text cols-"+cols}>
        <TextField
          ref="text"
          hintText={i18n(schema.hint)}
          errorText={error && error.message}
          defaultValue={this.props.value}
          floatingLabelText={i18n(this.props.name)}
          onChange={this._didChange}
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

