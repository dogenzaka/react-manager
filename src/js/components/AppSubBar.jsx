'use strict';

import React from 'react';
import AppStore from '../stores/AppStore';

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    zDepth: React.PropTypes.number,
  },

  componentDidMount() {
    AppStore.addListener(this._setState);
  },

  componentDidUnmount() {
    AppStore.removeListener(this._setState);
  },

  _setState(state) {
    this.setState(state);
  },

  render() {

    let zDepth = this.props.zDepth || 0;
    let className = "sub-bar " + (this.props.className || "") + " mui-paper mui-z-depth-"+zDepth;

    return (
      <div className={className}>
        <div className="sub-bar__title">{this.props.title}</div>
      </div>
    );
  }

});

