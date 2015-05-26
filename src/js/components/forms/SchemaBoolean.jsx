'use strict';

import React from 'react';

import { Toggle } from 'material-ui';
import i18n from '../../i18n';

let SchemaBoolean = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object.isRequired,
    value: React.PropTypes.bool,
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

    let value = this.state.value;
    let schema = this.props.schema;
    let cols = schema.cols || 4;

    let styles = {
      bool: {
        paddingTop: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
      },
      label: {
        lineHeight: '36px',
        marginRight: '10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'rgba(0,0,0,0.5)',
      },
      items: {
        padding: '5px 0 0 0',
      },
    };

    return (
      <div className={"cols-"+cols} style={styles.bool}>
        <label style={styles.label}>{i18n(this.props.name)}</label>
        <div style={styles.items}>
          <Toggle toggled={value} onToggle={this._didToggle()} />
        </div>
      </div>
    );

  },

  _didToggle() {
    return () => {
      let _value = !this.state.value;
      this.setState({ value: _value });
      if (this.props.onChange) {
        setTimeout(() => {
          this.props.onChange(_value);
        }, 0);
      }
    };
  },

});

export default SchemaBoolean;
