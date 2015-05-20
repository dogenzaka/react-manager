'use strict';

import React from 'react';
import moment from 'moment';
import i18n from '../../i18n';

import { DatePicker, TextField } from 'material-ui';
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
      error: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
    this.state.error = props.error;
  },

  getValue() {
    let date = this.refs.picker.getDate();
    let time = this.refs.time.getValue();
    return this.formatDate(date) + 'T' + time + moment(date).format('Z');
  },

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  componentDidMount() {
    if (this.state.value) {
      let date = new Date(this.state.value);
      this.refs.picker.setDate(date);
      this.refs.time.setValue(moment(date).format('HH:mm:ss'));
    }
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let cols = schema.cols || 6;
    let floatingText;
    let hintText;

    if (this.props.mini) {
      hintText = i18n(this.props.name);
    } else {
      hintText = i18n(schema.hint);
      floatingText = i18n(this.props.name);
    }

    return (
      <div className={"schema-form__item schema-form__item--datetime cols-"+cols}>
        <div className="schema-form__item--datetime__date">
          <DatePicker
            ref="picker"
            mode="landscape"
            formatDate={this.formatDate}
            defaultValue=""
            hintText={hintText}
            errorText={error && error.message}
            floatingLabelText={floatingText} />
        </div>
        <div className="schema-form__item--datetime__time">
          <TextField
            ref="time"
            hintText={hintText}
            defaultValue=""
            errorText={error && error.message}
            onChange={this.validate} />
        </div>
      </div>
    );
  },

});

export default SchemaDateTime;


