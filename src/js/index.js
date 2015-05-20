'use strict';

// For react
import React from 'react';
window.React = React;

import injectTapPlugin from 'react-tap-event-plugin';
injectTapPlugin();

import tv4 from 'tv4';
import i18n from './i18n';
tv4.addFormat('datetime', function(value) {
  let time = Date.parse(value);
  if (isNaN(time)) {
    return i18n('Date time format failed');
  } else {
    return null;
  }
});

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
