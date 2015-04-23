'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import { AppCanvas } from 'material-ui';
import i18n from '../i18n';

import Header from './Header.jsx';
import Snackbar from './Snackbar.jsx';
import AppStore from '../stores/AppStore';

import { setTitle } from '../actions/HeaderAction';

let App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    AppStore.addListener(this._setState);
    window.addEventListener('hashchange', this._hashChange);
    this._hashChange();
  },

  componentWillUnmount() {
    AppStore.removeListener(this._setState);
    window.removeEventListener('hashchange', this._hashChange);
  },

  _hashChange() {
    let path = this.context.router.getCurrentPathname().split('/');
    // remove first item
    path.shift();
    if (path.length === 0) {
      setTitle(i18n('site.title'));
    } else {
      let title = path.map(name => i18n(name)).join(' - ');
      setTitle(title);
    }
  },

  _setState(state) {
  },

  render() {
    return (
      <AppCanvas predefinedLayout={1}>
        <Header />
        <RouteHandler />
        <Snackbar />
      </AppCanvas>
    );
  }

});

export default App;
