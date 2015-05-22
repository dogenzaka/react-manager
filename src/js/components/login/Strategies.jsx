'use strict';

import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';

import _ from 'lodash';
import i18n from '../../i18n';
import { getAuthConfig } from '../../actions/AuthAction';
import AuthStore from '../../stores/AuthStore';
import EndpointStore from '../../stores/EndpointStore';

let { RaisedButton } = mui;

/**
 * Login / Strategies
 */
export default React.createClass({

  mixins: [Router.Navigation],

  propTypes: {
    strategy: React.PropTypes.object
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    AuthStore.addListener(this._setState);
    getAuthConfig();
  },

  componentWillUnmount() {
    AuthStore.removeListener(this._setState);
  },

  _setState(state) {
    // Got auth config
    if (state.authConfig) {
      this.setState({ authConfig: state.authConfig });
    }
  },

  _didClick(strategy) {
    return () => {
      if (strategy.type === 'password') {
        // Move to login form
        this.context.router.transitionTo('loginForm');
      } else if (strategy.type === 'google') {
        // Move to google oauth
        let ep = EndpointStore.getActiveEndpoint();
        let state = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.location.href = ep.url + '/oauth/google?state=' + encodeURIComponent(state);
      }
    };
  },

  render() {

    let config = this.state.authConfig;
    let strategies;
    if (config) {
      strategies = _.map(config.strategies, strategy => <RaisedButton
        key={strategy.name}
        label={i18n(strategy.name)}
        onClick={this._didClick(strategy)}
        primary={true} />);
    }

    return (
      <div>
        <div className="login__description">
          {i18n("Select an authorization type")}
        </div>
        <div className="login__strategies">
          {strategies}
        </div>
      </div>
    );

  }

});

