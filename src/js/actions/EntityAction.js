'use strict';

let dispatcher = require('../dispatcher');

import _ from 'lodash';
import APIClient from '../services/APIClient';

export function getEntityItems(id, opts) {

  opts = opts || {};
  let limit = opts.limit || 40;
  let offset = opts.offset || 0;
  let query = opts.query;

  if (query && !_.isEmpty(query)) {

    APIClient.get('/search/entity/'+id, { limit: limit, offset: offset, query: JSON.stringify(query) }, (err, result) => {
      if (err) {
        dispatcher.notifyError(err);
      } else {
        dispatcher.setEntityItems({
          id: result,
          query: query,
          limit: limit,
          offset: offset,
          list: result.list,
        });
      }
    });

  } else {

    APIClient.get('/entity/'+id, { limit: limit, offset: offset }, (err, result) => {
      if (err) {
        dispatcher.notifyError(err);
      } else {
        dispatcher.setEntityItems({
          id: result,
          limit: limit,
          offset: offset,
          list: result.list
        });
      }
    });

  }
}

function getPrimaryKey(spec, item) {
  let primaryKeys = spec.schema.primaryKey || ['id'];
  return _.map(primaryKeys, key => item[key]).join(',');
}

export function updateEntityField(spec, item, field, value) {

  let primaryKey = getPrimaryKey(spec, item);

  APIClient.put(
    '/entity/'+spec.id+'/'+primaryKey+'/'+field.id,
    { value: value },
    (err) => {
      if (err) {
        dispatcher.notifyError(err);
      } else {
        dispatcher.updateEntityField(spec, item, field, value);
      }
    }
  );

}

export function updateEntity(spec, item) {

  let primaryKey = spec.getPrimaryKey(item);

  APIClient.put(
    '/entity/'+spec.id+'/'+primaryKey,
    item,
    (err) => {
      if (err) {
        dispatcher.notifyError(err);
        dispatcher.updateEntityFail(spec, item);
      } else {
        dispatcher.updateEntity(spec, item);
      }
    }
  );

}

export function removeEntity(spec, item) {

  let primaryKey = getPrimaryKey(spec, item);

  APIClient.del(
    '/entity/'+spec.id+'/'+primaryKey,
    (err) => {
      if (err) {
        dispatcher.notifyError(err);
      } else {
        dispatcher.removeEntity(spec, item);
      }
    }
  );
}

export function toggleSearch() {
  dispatcher.toggleEntitySearch();
}
