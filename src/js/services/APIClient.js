'use strict';

import request from 'superagent';
import EndpointStore from '../stores/EndpointStore';

class APIClient {

  constructor() {
    this.endpoint = EndpointStore.getActiveEndpoint();
  }

}

export default new APIClient();
