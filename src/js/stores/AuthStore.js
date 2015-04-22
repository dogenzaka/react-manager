'use strict';

import BaseStore from './BaseStore';

// LocalStorage to store session token
let localStorage = global.localStorage;

/**
 * AuthStore stores authenticated user
 */
class AuthStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    return {};
  }

  /**
   * Check user exists in store
   */
  hasUser() {
    return !!this.getUser();
  }

  /**
   * Set configuration
   */
  setAuthConfig(authConfig) {
    this.setState({
      authConfig: authConfig
    });
  }

  /**
   * Set user
   */
  setAuthUser(user) {
    this.setState({
      user: user,
      error: null
    });
  }

  /**
   * Set token
   */
  setAuthToken(token) {
    localStorage.setItem("rm_token", token);
    // Clear user and token
    this.setState({ user: null, error: null, token: token });
  }

  /**
   * Erase authrozied info
   */
  logout() {
    localStorage.removeItem("rm_token");
    this.setState({ user: null });
  }

  /**
   * Failure login
   */
  setAuthFail(err) {
    this.setState({ error: err });
  }

  /**
   * Return true when user authorized
   */
  authorized() {
    return !!this.state.user;
  }

  /**
   * Check token exists in store
   */
  hasToken() {
    return !!this.getToken();
  }

  /**
   * Get token
   */
  getToken() {
    return localStorage.getItem("rm_token");
  }

  /**
   * Get user
   */
  getUser() {
    return this.state.user;
  }

}

export default new AuthStore();
