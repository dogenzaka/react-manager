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
    let rotated = this.state.rotated ? " rotate45":"";
    let mini = pos === "top" ? true : false;
    let iconClass = "md-add";

    let style = pos === "top" ? {
      position: 'fixed',
      top: '88px',
      left: '16px',
      width: '56px',
      zIndex: 5,
    } : {
      position: 'fixed',
      bottom: '20px',
      right: '16px',
      textAlign: 'right',
      width: '56px',
      zIndex: 2,
    };

    return (
      <div style={style}>
        <FloatingActionButton mini={mini} iconClassName={iconClass + " md-2x "+rotated} onClick={this._didClickAdd} zDepth={1} styles={{animationDuration:'0.5s'}} />
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

