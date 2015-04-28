'use strict';

import _ from 'lodash';

class EntitySpec {

  constructor(opts) {
    this.id = opts.id;
    this.schema = opts.schema;
    this.features = opts.features;
    this._normalize();
  }

  _normalize() {
    // Primary key default is ['id']
    if (!this.schema.primaryKey) {
      this.schema.primaryKey = ['id'];
    }
    // Primary key should be array
    if (!Array.isArray(this.schema.primaryKey)) {
      this.schema.primaryKey = [this.schema.primaryKey];
    }
  }

  /**
   * Get primary key string
   */
  getPrimaryKey(item) {
    return _.map(this.schema.primaryKey, key => item[key]).join(',');
  }

  /**
   * Check the key is in primary or not
   */
  isPrimary(key) {
    return this.schema.primaryKey.indexOf(key) >= 0;
  }

}

export default EntitySpec;
