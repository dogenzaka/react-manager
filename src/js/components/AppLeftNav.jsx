'use strict';

import _ from 'lodash';
import React from 'react';
import i18n from '../i18n';
import { LeftNav, MenuItem, Paper } from 'material-ui';
import AuthStore from '../stores/AuthStore';
import ConfigStore from '../stores/ConfigStore';
import { Theme } from '../styles';

class AppLeftNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      config: ConfigStore.state.config,
      user: AuthStore.getUser(),
    };
    this._setAuthState = this._setAuthState.bind(this);
    this._setConfigState = this._setConfigState.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  componentDidMount() {
    AuthStore.addListener(this._setAuthState);
    ConfigStore.addListener(this._setConfigState);
  }

  componentWillUnmount() {
    AuthStore.removeListener(this._setAuthState);
    ConfigStore.removeListener(this._setConfigState);
  }

  _setAuthState(state) {
    // Authorized user
    this.setState({ user: state.user });
  }

  _setConfigState(state) {
    this.setState({ config: state.config });
  }

  render() {

    let styles = {
      header: {
        height: '120px',
        background: Theme.palette.primary2Color,
      },
      user: {
        padding: '20px 0 0 16px',
      },
      userPhoto: {
        width: '60px',
        height: '60px',
        borderRadius: '30px',
        backgroundSize: '60px 60px',
      },
      userName: {
        paddingTop: '10px',
        fontWeight: 'bold',
        color: Theme.palette.textLightColor,
      },
    };

    let header;
    if (this.state.user) {
      styles.userPhoto.backgroundImage = 'url('+this.state.user.photo+')',
      header = (
        <Paper style={styles.header}>
          <div style={styles.user}>
            <div style={styles.userPhoto}></div>
            <div style={styles.userName}>{this.state.user.name}</div>
          </div>
        </Paper>
      );
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
  }

  _getMenuItems() {
    let menuItems = [];
    let config = this.state.config || {};
    if (config.entities) {
      menuItems.push({ route: 'entity', text: i18n('Entities') });
    }
    menuItems.push({ type: MenuItem.Types.SUBHEADER, text: i18n('Others') });
    menuItems.push({ route: 'endpoints', text: i18n('Endpoint') });
    if (config) {
      menuItems.push({ route: 'logout', text: i18n('Logout') });
    }
    return menuItems;
  }

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
  }

  /**
   * Click menu item
   */
  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route, payload.params);
  }

}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

export default AppLeftNav;

