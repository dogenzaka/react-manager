'use strict';

let dispatcher = require('../dispatcher');

import _ from 'lodash';
import APIClient from '../services/APIClient';

export function getEntityItems(id, opts) {

  opts = opts || 0;
  let limit = opts.limit || 40;
  let offset = opts.offset || 0;

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

  APIClient.put(
    '/entity/'+spec.id+'/'+primaryKey,
    { value: item },
    (err) => {
      if (err) {
        dispatcher.notifyError(err);
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

