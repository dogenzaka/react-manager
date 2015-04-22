'use strict';

import React from 'react';
import Router from 'react-router';
import i18n from '../i18n';
import { LeftNav } from 'material-ui';
import AuthStore from '../stores/AuthStore';

export default React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {
      menuItems: [
        { route: 'endpoints', text: i18n('Endpoint') },
        { route: 'logout', text: i18n('Logout') },
      ]
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
  },

  componentWillUnmount() {
    AuthStore.removeListener(this._setAuthState);
  },

  _setAuthState(state) {
    // Authorized user
    this.setState({ user: state.user });
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

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        header={header}
        isInitialOpen={false}
        menuItems={this.state.menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange}>
      </LeftNav>
    );
  },

  _getSelectedIndex() {
    let menuItems = this.state.menuItems;
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

