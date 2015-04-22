'use strict';

import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import i18n from '../i18n';
import { LeftNav, MenuItem } from 'material-ui';
import AuthStore from '../stores/AuthStore';
import ConfigStore from '../stores/ConfigStore';

export default React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {
      config: ConfigStore.state.config,
    };
  },

  toggle() {
    this.refs.leftNav.toggle();
  },

  componentWillMount() {
    this.state.user = AuthStore.getUser();
  },

  componentDidMount() {
    AuthStore.addListener(this._setAuthState);
    ConfigStore.addListener(this._setConfigState);
  },

  componentWillUnmount() {
    AuthStore.removeListener(this._setAuthState);
    ConfigStore.removeListener(this._setConfigState);
  },

  _setAuthState(state) {
    // Authorized user
    this.setState({ user: state.user });
  },

  _setConfigState(state) {
    this.setState({ config: state.config });
  },

  render() {

    let header;
    if (this.state.user) {
      header =
        <div className="left-header mui-dark-theme mui-paper">
          <div className="left-header__user">
            <div className="left-header__user__photo" style={{backgroundImage:"url("+this.state.user.photo+")"}} />
            <div className="left-header__user__name">{this.state.user.name}</div>
          </div>
        </div>;
    } else {
      header = <div className="left-header mui-dark-theme mui-paper"></div>;
    }

    let menuItems = this._getMenuItems();

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        header={header}
        isInitialOpen={false}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex(menuItems)}
        onChange={this._onLeftNavChange}>
      </LeftNav>
    );
  },

  _getMenuItems() {
    let menuItems = [];
    let config = this.state.config || {};
    if (config.entities) {
      menuItems.push({ type: MenuItem.Types.SUBHEADER, text: i18n('Entities') });
      _.each(config.entities, entity => {
        menuItems.push({ route: 'entity', params: { id: entity.id }, text: i18n(entity.id) });
      });
    }
    menuItems.push({ type: MenuItem.Types.SUBHEADER, text: i18n('Others') });
    menuItems.push({ route: 'endpoints', text: i18n('Endpoint') });
    if (config) {
      menuItems.push({ route: 'logout', text: i18n('Logout') });
    }
    return menuItems;
  },

  /**
   * Get selected index from current route
   */
  _getSelectedIndex(menuItems) {
    for (let i = menuItems.length -1; i >= 0; i--) {
      let item = menuItems[i];
      // Check route
      if (item.route && this.context.router.isActive(item.route)) {
        if (item.params) {
          // Check router parameters
          if (_.isEqual(item.params, this.context.router.getCurrentParams())) {
            return i;
          }
        } else {
          return i;
        }
      }
    }
  },

  /**
   * Click menu item
   */
  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route, payload.params);
  },

});

