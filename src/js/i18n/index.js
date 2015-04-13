/* global navigator */
'use strict';

import _ from 'lodash';
import tv4 from 'tv4';

let browserLanguage = function() {
  if (navigator.languages) {
    return navigator.languages[0];
  } else if (navigator.userLanguage) {
    return navigator.userLanguage;
  } else {
    return navigator.language;
  }
  return 'en';
};

let messages = {};

let defaultLang = 'en';
let currentLang = browserLanguage();

/**
 * Flatten makes object structure to
 * flat map with dot separated values
 */
let flatten = function(obj, prefix, target) {
  target = target || {};
  if (prefix) {
    prefix = prefix + '.';
  } else {
    prefix = "";
  }
  _.each(obj, (value, key) => {
    let fullkey = prefix + key;
    if (typeof value === 'string') {
      target[fullkey] = value;
    } else {
      flatten(value, fullkey, target);
    }
  });
  return target;
};

/**
 * Resolve message from key
 */
let resolve = function(key) {
  if (!key) {
    return "";
  }
  let target = messages[currentLang];
  if (!target) {
    target = messages[defaultLang];
  }
  key = key.toLowerCase();
  return (target && target[key]) || key;
};

/**
 * Merges object into message map.
 */
resolve.merge = function(obj, lang) {

  let target = messages[lang];
  if (!target) {
    target = messages[lang] = {};
  }

  _.each(flatten(obj), (value, key) => {
    target[key] = value;
  });
};

/**
 * Set language
 */
resolve.setLanguage = function(lang) {
  currentLang = lang;
  tv4.language(lang);
};

['en','ja'].forEach(lang => {
  let res = require('./'+lang);
  resolve.merge(res, lang);
  if (res.tv4) {
    tv4.addLanguage(lang, res.tv4);
  }
});
tv4.language(currentLang);

module.exports = resolve;
