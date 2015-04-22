'use strict';

import BaseStore from './BaseStore';
import _ from 'lodash';

let localStorage = global.localStorage;
const STORE_KEY = "rm_endpoints";

/**
 * EndpointStore stores endpoints to localStorage
 */
class EndpointStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    // Load endpoints from local storage
    let endpoints = localStorage.getItem(STORE_KEY) || "[]";
    try {
      return {
        endpoints: JSON.parse(endpoints)
      };
    } catch (e) {
      console.error("Failed to parse endpoints", e);
      return {
        endpoints: []
      };
    }
  }

  getActiveEndpoint() {
    return _.find(this.state.endpoints, endpoint => !!endpoint.selected);
  }

  save() {
    _.each(this.state.endpoints, (endpoint, i) => {
      endpoint.index = i;
      this._normalizeUrl(endpoint);
    });
    let value = JSON.stringify(this.state.endpoints);
    localStorage.setItem(STORE_KEY, value);
  }

  /**
   * Normalize endpoint URL
   */
  _normalizeUrl(endpoint) {
    let url = endpoint.url;
    if (url.charAt(url.length-1) === '/') {
      endpoint.url = url.substr(0, url.length-1);
    }
  }

  /**
   * Add an endpoint
   */
  addEndpoint(endpoint) {
    this.state.endpoints.push(endpoint);
    this.state.selected = null;
    this.save();
    this.emit();
  }

  /**
   * Update an endpoint
   */
  updateEndpoint(endpoint) {
    _.each(this.state.endpoints, exist => {
      if (exist.index === endpoint.index) {
        exist.name = endpoint.name;
        exist.url = endpoint.url;
      }
    });
    this.state.selected = null;
    this.save();
    this.emit();
  }

  /**
   * Remove an endpoint
   */
  removeEndpoint(endpoint) {
    _.remove(this.state.endpoints, target => target.index === endpoint.index);
    this.state.selected = null;
    this.save();
    this.emit();
  }

  /**
   * Select an active endpoint
   */
  selectEndpoint(endpoint) {
    _.map(this.state.endpoints, target => {
      target.selected = endpoint.index === target.index;
    });
    this.save();
    // Temporary activate selected state
    this.setState({ selected: true });
    // Reset after emitting
    delete this.state.selected;
  }

}

export default new EndpointStore();
