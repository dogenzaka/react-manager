'use strict';

import React from 'react';
import Router from 'react-router';
import APIClient from '../services/APIClient';

export default React.createClass({

  mixins: [Router.Navigation],

  render() {
    return (
      <div id="main" />
    );
  }

});
