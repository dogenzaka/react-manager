'use strict';

import React from 'react';
import Router from 'react-router';

import { logout } from '../../actions/AuthAction';
import AuthStore from '../../stores/AuthStore';

/**
 * Logout
 */
export default React.createClass({

  mixins: [Router.Navigation],

  componentWillMount() {
  },

  componentDidMount() {
    AuthStore.addListener(this._setState);
    logout();
  },

  componentWillUnmount() {
    AuthStore.removeListener(this._setState);
  },

  _setState(state) {
    if (state.user === null) {
      this.context.router.transitionTo('index');
    }
  },

  render() {
    return <div/>;
  }

});



