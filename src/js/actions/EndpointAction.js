'use strict';

let dispatcher = require('../dispatcher');

/**
 * Add an endpoint
 */
export function addEndpoint(endpoint) {
  dispatcher.addEndpoint(endpoint);
}

/**
 * Update an endpoint
 */
export function updateEndpoint(endpoint) {
  dispatcher.updateEndpoint(endpoint);
}

/**
 * Select an endpoint
 */
export function selectEndpoint(endpoint) {
  dispatcher.selectEndpoint(endpoint);
}

/**
 * Remove an endpoint
 */
export function removeEndpoint(endpoint) {
  dispatcher.removeEndpoint(endpoint);
}

