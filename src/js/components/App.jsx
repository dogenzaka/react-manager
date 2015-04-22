'use strict';

import React from 'react';
import { RouteHandler, State } from 'react-router';
import { AppCanvas } from 'material-ui';

import Header from './Header.jsx';
import Snackbar from './Snackbar.jsx';


let App = React.createClass({

  mixins: [State],

  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  _setState(state) {
    this.setState({ title: state.title });
  },

  render() {
    return (
      <AppCanvas predefinedLayout={1}>
        <Header />
        <RouteHandler />
        <Snackbar />
      </AppCanvas>
    );
  }

});

export default App;
