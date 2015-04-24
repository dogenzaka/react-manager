'use strict';

let dispatcher = require('../dispatcher');

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
