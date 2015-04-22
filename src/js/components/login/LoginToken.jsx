'use strict';

import React from 'react';
import Router from 'react-router';
import { setAuthToken } from '../../actions/AuthAction';

/**
 * Login / LoginToken
 */
export default React.createClass({

  mixins: [Router.Navigation],

  getInitialState() {
    return {};
  },

  componentWillMount() {
    // Save token
    let { router } = this.context;
    let token = router.getCurrentParams().token;
    if (token) {
      setAuthToken(token);
      this.context.router.replaceWith('index');
    }
  },

  componentWillUnmount() {
  },

  render() {
    return <div />;
  }

});




