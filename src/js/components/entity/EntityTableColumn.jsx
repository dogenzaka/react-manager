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
    return { editing: false };
  },

  componentDidMount() {
  },

  componentWillReceiveProps() {
  },

  render() {

    let value = this.props.value;

    if (this.state.editing) {
      value = <input
        ref="input"
        type="text"
        defaultValue={value}
        onBlur={this._didBlur}
        onKeyUp={this._didKeyUp}
        />;
      setTimeout(() => {
        this.refs.input.getDOMNode().focus();
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
      this.setState({ editing: true, original: this.props.value });
    }
  },

  _didBlur() {
    this.setState({ editing: false });
  },

  _didKeyUp(e) {
    if (e.keyCode === 27) {
      // ESC
      this.props.value = this.state.original;
      this.setState({ editing: false });
    } else if (e.keyCode === 13) {
      // Enter
      let value = e.target.value;
      if (value === this.state.original) {
        this.setState({ editing: false });
      } else {
        this.props.onChange(this, this.props.field, value);
      }
    }
  },

});

export default EntityTableColumn;
