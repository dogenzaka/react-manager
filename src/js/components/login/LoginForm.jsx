'use strict';

import React from 'react';
import Router from 'react-router';
import { login } from '../../actions/AuthAction';
import AuthStore from '../../stores/AuthStore';
import SchemaForm from '../../components/forms/SchemaForm.jsx';
import i18n from '../../i18n';

/**
 * Login / LoginForm
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
  },

  componentWillUnmount() {
    AuthStore.removeListener(this._setState);
  },

  _setState(state) {
    if (state.token) {
      this.context.router.transitionTo("loginToken", { token: state.token });
    } else {
      this.setState(state);
    }
  },

  _onSubmit(body) {
    login(body);
  },

  _onCancel() {
    this.context.router.goBack();
  },

  render() {

    let schema = {
      type: 'object',
      properties: {
        username: 'string',
        password: { type: 'string', format: 'password' },
      },
      required: ['username','password']
    };

    return (
      <div>
        <h3>Login</h3>
        <SchemaForm
          name="login"
          ref="form"
          schema={schema}
          submitLabel={i18n('Login')}
          onSubmit={this._onSubmit}
          onCancel={this._onCancel}
        />
      </div>
    );
  }

});



