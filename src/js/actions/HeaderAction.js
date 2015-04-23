'use strict';

let dispatcher = require('../dispatcher');

export function setTitle(title) {
  dispatcher.setTitle(title);
}

export function expandTitle(expansion) {
  dispatcher.expandTitle(expansion);
}

