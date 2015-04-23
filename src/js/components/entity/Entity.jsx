'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import AuthMixin from '../../mixins/AuthMixin';
import EntityMenu from './EntityMenu.jsx';

let Entity = React.createClass({

  mixins: [AuthMixin],

  getInitialState() {
    return {};
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  componentWillUpdate() {
  },

  render() {
    return (
      <div className="entity">
        <EntityMenu />
        <RouteHandler />
      </div>
    );
  }

});

export default Entity;

