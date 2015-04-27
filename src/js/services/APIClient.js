'use strict';

import request from 'superagent';
import { logout } from '../actions/AuthAction';
import AuthStore from '../stores/AuthStore';
import EndpointStore from '../stores/EndpointStore';

class APIClient {

  constructor() {
    this.endpoint = EndpointStore.getActiveEndpoint();
  }

  _path(path) {
    let ep = EndpointStore.getActiveEndpoint();
    if (ep) {
      if (path.charAt(0) !== '/') {
        path = '/' + path;
      }
      return ep.url + path;
    }
    console.error("Endpoint not selected");
  }

  /**
   * General replier which converts
   * response into Error and body
   */
  _reply(callback, path) {
    return (err, res) => {
      if (err !== null) {
        if (err.status === 401) {
          if (path === '/login') {
            err.message = 'Login failed';
            callback(err);
          } else {
            logout();
            window.location.hash = "";
          }
        } else {
          callback(err);
        }
        return;
      }
      if (res.ok) {
        // OK
        return callback(null, res.body);
      } else {
        // re-create error with response
        err = new Error(res.text);
        err.status = res.status;
        err.statusType = res.statusType;
        return callback(err);
      }
    };
  }
  /**
   * Send get query to the server
   */
  get(path, query, callback) {
    if (typeof query === 'function') {
      callback = query;
      query = {};
    }
    console.info("API GET", path, query);
    request
    .get(this._path(path))
    .set('x-rm-token', AuthStore.getToken())
    .query(query)
    .end(this._reply(callback, path, query));
  }

  /**
   * Send post query to the server
   */
  post(path, body, callback) {
    if (typeof body === 'function') {
      callback = body;
      body = {};
    }
    console.info("API POST", path, body);
    request
    .post(this._path(path))
    .set('x-rm-token', AuthStore.getToken())
    .send(body)
    .end(this._reply(callback, path, body));
  }

  /**
   * Send put query to the server
   */
  put(path, body, callback) {
    if (typeof body === 'function') {
      callback = body;
      body = {};
    }
    console.info("API PUT", path, body);
    request
    .put(this._path(path))
    .set('x-rm-token', AuthStore.getToken())
    .send(body)
    .end(this._reply(callback, path, body));
  }

}

export default new APIClient();
