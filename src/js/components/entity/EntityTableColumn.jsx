'use strict';

import React from 'react';

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

  render() {

    let value = this.state.value;

    if (this.state.editing) {
      value = <input
        ref="input"
        type="text"
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
        className="entity__table__body__row__column"
        style={this.props.style}
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
