'use strict';

import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';

import AppLeftNav from './AppLeftNav.jsx';
import AppSubBar from './AppSubBar.jsx';

let { AppCanvas, AppBar } = mui;
let { RouteHandler } = Router;

let App = React.createClass({

  mixins: [Router.State],

  getInitialState() {
    return {};
  },

  _didTapMenuIcon() {
    this.refs.leftNav.toggle();
  },

  render() {

    let title = this.state.title || "React Manager";

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          className="mui-dark-theme"
          zDepth={0}
          onMenuIconButtonTouchTap={this._didTapMenuIcon} />

        <AppLeftNav ref="leftNav" />

        <RouteHandler />

      </AppCanvas>
    );
  }

});

export default App;
