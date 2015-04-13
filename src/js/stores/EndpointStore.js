'use strict';

import BaseStore from './BaseStore';
import _ from 'lodash';

let localStorage = global.localStorage;

/**
 * EndpointStore stores endpoints to localStorage
 */
class EndpointStore extends BaseStore {

  constructor() {
    super();
  }

  getInitialState() {
    // Load endpoints from local storage
    let endpoints = localStorage.getItem("endpoints") || "[]";
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

  registerDispatcher(dispatcher) {
    // Register to dispatcher
    dispatcher.on({
      addEndpoint: endpoint => {
        this.addEndpoint(endpoint);
      },
      updateEndpoint: endpoint => {
        this.updateEndpoint(endpoint);
      },
      removeEndpoint: endpoint => {
        this.removeEndpoint(endpoint);
      }
    });
  }

  getActiveEndpoint() {
    return _.find(this.state.endpoints, endpoint => !!endpoint.selected);
  }

  save() {
    _.each(this.state.endpoints, (endpoint, i) => {
      endpoint.index = i;
    });
    let value = JSON.stringify(this.state.endpoints);
    localStorage.setItem("endpoints", value);
  }

  /**
   * Add an endpoint
   */
  addEndpoint(endpoint) {
    this.state.endpoints.push(endpoint);
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
    this.save();
    this.emit();
  }

  /**
   * Remove an endpoint
   */
  removeEndpoint(endpoint) {
    _.remove(this.state.endpoints, target => target.index === endpoint.index);
    this.save();
    this.emit();
  }

  /**
   * Select an active endpoint
   */
  selectEndpoint(endpoint) {
    _.map(this.state.endpoints, function(target) {
      target.selected = endpoint.url === target.url;
    });
    this.save();
    this.emit();
  }

}

export default new EndpointStore();
