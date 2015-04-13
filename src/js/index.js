'use strict';

// For react
import React from 'react';
window.React = React;

import injectTapPlugin from 'react-tap-event-plugin';
injectTapPlugin();

import Router from 'react-router';
import routes from './components/Routes.jsx';
Router
.create({
  routes: routes,
  scrollBehavior: Router.ScrollTopBehavior
})
.run(Handler => {
  React.render(<Handler />, document.body);
});
