'use strict';

import _ from 'lodash';
import React from 'react';

import { FlatButton } from 'material-ui';
import i18n from '../../i18n';
import { Theme } from '../../styles';

let SchemaChoice = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object.isRequired,
    value: React.PropTypes.any,
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
    return this.state.value;
  },

  render() {

    let value = this.state.value;
    let schema = this.props.schema;
    let labels = schema.enumLabels || schema.enum;
    let cols = schema.cols || 12;

    let styles = {
      choice: {
        padding: '24px 0 0 8px',
        position: 'relative',
      },
      label: {
        lineHeight: '36px',
        marginRight: '10px',
        color: 'rgba(0,0,0,0.5)',
      },
      error: {
        fontSize: '12px',
        position: 'absolute',
        left: '8px',
        bottom: '-16px',
        color: Theme.palette.errorColor,
      },
      items: {
        display: 'flex',
        flexDirection: 'row',
      },
    };

    let items = _.map(schema.enum, (key, i) => {
      let label = labels[i];
      if (value === key) {
        return (
          <div key={key}>
            <FlatButton type="button" label={i18n(label)} primary={true} onClick={this._didCancel} style={{fontWeight:'bold'}} />
          </div>
        );
      } else {
        return (
          <div key={key}>
            <FlatButton type="button" label={i18n(label)} onClick={this._didClickItem(key)} />
          </div>
        );
      }
    });

    let error;
    if (this.state.error) {
      error = <div style={styles.error}>i18n(this.state.error.message)}</div>;
    }

    if (this.props.mini) {
      styles.choice.paddingTop = '0px';
    }

    return (
      <div className={"cols-"+cols} style={styles.choice}>
        <label style={styles.label}>{i18n(this.props.name)}</label>
        <div style={styles.items}>{items}</div>
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

export default SchemaChoice;

