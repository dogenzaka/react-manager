'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import { AppCanvas } from 'material-ui';
import i18n from '../i18n';

import Header from './Header.jsx';
import Snackbar from './Snackbar.jsx';
import AppStore from '../stores/AppStore';

import { setTitle } from '../actions/HeaderAction';
import { Theme } from '../styles';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._hashChange = this._hashChange.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: Theme,
    };
  }

  componentDidMount() {
    AppStore.addListener(this._setState);
    window.addEventListener('hashchange', this._hashChange);
    this._hashChange();
  }

  componentWillUnmount() {
    AppStore.removeListener(this._setState);
    window.removeEventListener('hashchange', this._hashChange);
  }

  _hashChange() {
    let path = this.context.router.getCurrentPathname().split('/');
    // remove first item
    path.shift();
    if (path.length === 0) {
      setTitle(i18n('site.title'));
    } else {
      // Skip token callback
      if (path[0] === 'login' && path[1] === 'token') {
        return;
      }
      let title = path.map(name => i18n(name)).join(' - ');
      setTitle(title);
    }
  }

  render() {
    return (
      <AppCanvas predefinedLayout={1}>
        <Header />
        <RouteHandler />
        <Snackbar />
      </AppCanvas>
    );
  }

}

App.contextTypes = {
  router: React.PropTypes.func
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default App;
