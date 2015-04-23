'use strict';

import React from 'react';
import { FloatingActionButton } from 'material-ui';

export default React.createClass({

  propTypes: {
    position: React.PropTypes.string,
    onClickAdd: React.PropTypes.func,
    items: React.PropTypes.array,
  },

  getInitialState() {
    return {
      rotated: false
    };
  },

  render() {

    let pos = this.props.position || "bottom";
    let rotated = this.state.rotated ? " rotated":"";
    let mini = pos === "top" ? true : false;
    let iconClass = "md-add";

    return (
      <div className={"floating-menu floating-menu--"+pos}>
        <FloatingActionButton mini={mini} iconClassName={iconClass + " md-2x"+rotated} onClick={this._didClickAdd} zDepth={1} />
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

