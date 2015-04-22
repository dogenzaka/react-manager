'use strict';

import React from 'react';
import { TextField } from 'material-ui';

let SchemaNumber = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  render() {

    let schema = this.props.schema;
    let error = this.props.error;

    return (
      <div className="schema-form__item schema-form__item--number">
        <TextField
          hintText={schema.hint || ""}
          errorText={error && error.message}
          defaultValue={this.props.value}
          floatingLabelText={this.props.name}
          onChange={this._onChange}
        />
      </div>
    );
  },

  _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(Number(e.target.value));
    }
  },

});

export default SchemaNumber;

