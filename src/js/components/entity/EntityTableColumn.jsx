'use strict';

import React from 'react';
import _ from 'lodash';

import { Theme } from '../../styles';

let EntityTableColumn = React.createClass({

  propTypes: {
    field: React.PropTypes.object,
    value: React.PropTypes.any,
    style: React.PropTypes.object,
    editable: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return { editing: false, value: this.props.value };
  },

  componentDidMount() {
  },

  componentWillReceiveProps(props) {
    this.state.value = props.value;
  },

  componentWillUpdate() {
    this.state.editing = false;
  },

  render() {

    let value = this.state.value;

    let styles = {
      column: {
        height: '48px',
        lineHeight: '48px',
        display: 'block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flex: 4,
        padding: '0 2px 0 8px',
      },
      input: {
        width: '100%',
        border: 'none',
        padding: '3px 0',
        background: 'transparent',
        color: Theme.palette.primary2Color,
        borderBottom: '1px solid ' + Theme.palette.accent1Color,
      },
    };

    if (this.state.editing) {
      value = <input
        ref="input"
        type="text"
        style={styles.input}
        defaultValue={value}
        onBlur={this._didBlur}
        onKeyUp={this._didKeyUp}
        />;
      setTimeout(() => {
        if (this.refs.input) {
          this.refs.input.getDOMNode().focus();
        }
      }, 1);
    }

    return (
      <div
        style={_.extend({}, styles.column, this.props.style)}
        onClick={this._didClick}>
        {value}
      </div>
    );
  },

  _didClick() {
    if (this.props.editable) {
      this.setState({ editing: true, original: this.state.value });
    }
  },

  _didBlur() {
    this.setState({ editing: false });
  },

  _didKeyUp(e) {
    if (e.keyCode === 27) {
      // ESC
      this.setState({ editing: false, value: this.state.original });
    } else if (e.keyCode === 13) {
      // Enter
      let value = e.target.value;
      if (value === this.state.original) {
        this.setState({ editing: false, value: value });
      } else {
        this.props.onChange(this, this.props.field, value);
      }
    }
  },

});

export default EntityTableColumn;
