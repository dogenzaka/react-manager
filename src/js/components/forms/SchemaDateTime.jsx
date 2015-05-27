'use strict';

import React from 'react';
import moment from 'moment';
import i18n from '../../i18n';

import { DatePicker, TimePicker } from 'material-ui';
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
    let time = this.refs.time.getTime();
    return this.formatDate(date) + 'T' + moment(time).format('HH:mm:ssZ');
  },

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  componentDidMount() {
    if (this.state.value) {
      let date = new Date(this.state.value);
      this.refs.picker.setDate(date);
      this.refs.time.setTime(date);
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

    let styles = {
      datetime: {
        display: 'flex',
        padding: '0 0 0 8px',
      },
      date: {
        flexGrow: 1,
      },
      time: {
        flexGrow: 1,
        padding: '0 0 0 8px',
      },
    };

    return (
      <div className={"cols-"+cols} style={styles.datetime}>
        <div style={styles.date}>
          <DatePicker
            ref="picker"
            mode="landscape"
            formatDate={this.formatDate}
            hintText={hintText}
            style={{width:'100%'}}
            errorText={error && error.message}
            floatingLabelText={floatingText} />
        </div>
        <div style={styles.time}>
          <TimePicker
            ref="time"
            hintText={hintText}
            format="24hr"
            style={{width:'100%', paddingTop:'24px'}}
            errorText={error && error.message}
            onChange={this.validate} />
        </div>
      </div>
    );
  },

});

export default SchemaDateTime;


