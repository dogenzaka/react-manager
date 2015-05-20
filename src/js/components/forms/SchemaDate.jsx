'use strict';

import React from 'react';
import moment from 'moment';
import i18n from '../../i18n';

import { DatePicker } from 'material-ui';
import { ValidateMixin } from './SchemaMixin';

let SchemaDateTime = React.createClass({

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
    let date = this.refs.picker.getDate();
    return this.formatDate(date);
  },

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let cols = schema.cols || 4;
    let floatingText;
    let hintText;

    if (this.props.mini) {
      hintText = i18n(this.props.name);
    } else {
      hintText = i18n(schema.hint);
      floatingText = i18n(this.props.name);
    }

    return (
      <div className={"schema-form__item schema-form__item--date cols-"+cols}>
        <DatePicker
          ref="picker"
          mode="landscape"
          formatDate={this.formatDate}
          hintText={hintText}
          errorText={error && error.message}
          defaultValue={this.state.value}
          floatingLabelText={floatingText} />
      </div>
    );
  },

});

export default SchemaDateTime;



