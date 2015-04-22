'use strict';

import React from 'react';
import mui from 'material-ui';
import i18n from '../i18n';
import HeaderStore from '../stores/HeaderStore';
import AppLeftNav from './AppLeftNav.jsx';

let { AppBar } = mui;

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    onTapMenu: React.PropTypes.func,
  },

  getInitialState() {
    return {
      title: HeaderStore.state.title,
      subTitle: HeaderStore.state.subTitle,
    };
  },

  componentDidMount() {
    HeaderStore.addListener(this._setState);
  },

  componentWillUnmount() {
    HeaderStore.removeListener(this._setState);
  },

  _setState(state) {
    this.setState(state);
  },

  _didTapMenuIcon() {
    this.refs.leftNav.toggle();
  },

  render() {
    let barDepth = 0;
    let title;
    let subBar;
    if (this.state.subTitle) {
      subBar =
        <div className="sub-bar mui-dark-theme mui-paper mui-z-depth-1">
          <div className={"sub-bar__title"}>{this.state.subTitle}</div>
        </div>;
      title = "";
    } else {
      barDepth = 1;
      title = this.state.title;
    }
    return (
      <header>
        <AppLeftNav ref="leftNav" />
        <AppBar
          className="mui-dark-theme"
          title={i18n(title)}
          zDepth={barDepth}
          onMenuIconButtonTouchTap={this._didTapMenuIcon} />
        {subBar}
      </header>
    );

  }

});


