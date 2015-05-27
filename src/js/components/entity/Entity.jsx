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
    let style = {
      height: 'calc(100% - 64px)',
      paddingTop: '64px',
      display: 'flex',
    };

    return (
      <div style={style}>
        <EntityMenu />
        <RouteHandler />
      </div>
    );
  }

});

export default Entity;

