'use strict';

import React from 'react';
import Router from 'react-router';

import { setTitle } from '../../actions/HeaderAction';
import EndpointStore from '../../stores/EndpointStore';

let { RouteHandler } = Router;

/**
 * Login
 */
export default React.createClass({

  mixins: [Router.Navigation],

  statics: {
    willTransitionTo: function(transition) {
      if (!EndpointStore.getActiveEndpoint()) {
        transition.redirect('endpoints');
        return;
      }
    }
  },

  getInitialState() {
    return { authConfig: {} };
  },

  componentWillMount() {
    setTitle('Login');
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  componentWillUpdate() {
  },

  render() {

    let style = {
      height: 'calc(100% - 64px)',
      padding: '64px 20px',
    };

    return (
      <div style={style}>
        <RouteHandler />
      </div>
    );
  }

});


