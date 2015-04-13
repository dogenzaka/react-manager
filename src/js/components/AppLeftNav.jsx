'use strict';

import React from 'react';
import Router from 'react-router';
import { LeftNav } from 'material-ui';

let menuItems = [
  { route: 'endpoints', text: 'Endpoint' }
];

export default React.createClass({

  mixins: [Router.Navigation, Router.State],

  toggle() {
    this.refs.leftNav.toggle();
  },

  render() {
    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitialOpen={false}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange}
      />
    );
  },

  _getSelectedIndex() {
    for (let i = menuItems.length -1; i >= 0; i--) {
      let item = menuItems[i];
      if (item.route && this.context.router.isActive(item.route)) {
        return i;
      }
    }
  },

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  },

});

