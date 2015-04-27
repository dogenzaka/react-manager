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

export function updateEntityField(params) {

  let spec = params.spec;
  let item = params.item;
  let field = params.field;
  let value = params.value;

  let primaryKeys = spec.schema.primaryKey || ['id'];
  let primaryKey = _.map(primaryKeys, key => item[key]).join(',');

  APIClient.put(
    '/entity/'+spec.id+'/'+primaryKey+'/'+field.id,
    { value: value },
    (err) => {
      if (err) {
        dispatcher.notifyError(err);
      } else {
        dispatcher.updateEntityField(spec, field, item, value);
      }
    }
  );

}

