'use strict';

import dispatcher from '../dispatcher';
import APIClient from '../services/APIClient';

export function getAuthConfig() {
  APIClient.get('/auth', (err, authConfig) => {
    if (err) {
      dispatcher.notifyError(err);
    } else {
      dispatcher.setAuthConfig(authConfig);
    }
  });
}

export function getUser(callback) {
  APIClient.get('/user', (err, user) => {
    if (err) {
      dispatcher.notifyError(err);
    } else {
      dispatcher.setAuthUser(user);
      if (callback) {
        callback();
      }
    }
  });
}

export function setAuthToken(token) {
  dispatcher.setAuthToken(token);
}

/**
 * Login with form values. Body must be like
 * { username: 'userID', password: 'password' }
 */
export function login(body) {
  APIClient.post('/login', body, (err, body) => {
    if (err) {
      dispatcher.setAuthFail(err);
    } else {
      dispatcher.setAuthToken(body.token);
    }
  });
}

export function logout() {
  APIClient.get('/logout', (err) => {
    if (err) {
      dispatcher.notifyError(err);
    } else {
      dispatcher.logout();
    }
  });
}
