'use strict';

import React from 'react';
import { FloatingActionButton } from 'material-ui';

export default React.createClass({

  propTypes: {
    position: React.PropTypes.string,
    onClickAdd: React.PropTypes.func,
  },

  getInitialState() {
    return {
      rotated: false
    };
  },

  componentDidMount() {
  },

  componentDidUnmount() {
  },

  render() {

    let pos = this.props.position || "bottom";
    let rotated = this.state.rotated ? " rotated":"";

    return (
      <div className={"floating-menu floating-menu--"+pos}>
        <FloatingActionButton iconClassName={"md-add md-2x"+rotated} onClick={this._didClickAdd} />
      </div>
    );
  },

  rotateIcon(active) {
    if (active) {
      this.setState({ rotated: true });
    } else {
      this.setState({ rotated: false });
    }
  },

  _setState(state) {
    this.setState(state);
  },

  _didClickAdd(e) {
    if (this.props.onClickAdd) {
      this.props.onClickAdd(e);
    }
  },

});

