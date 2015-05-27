'use strict';

import React from 'react';
import { Menu, Paper } from 'material-ui';

import i18n from '../../i18n';
import ConfigStore from '../../stores/ConfigStore';

let EntityMenu = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      config: ConfigStore.state.config
    };
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  render() {

    let items = this.state.config.entities.map(entity => (
      { id: entity.id, text: i18n(entity.id) }
    ));

    let styles = {
      menu: {
        width: '160px',
        height: '100%',
        overflow: 'scroll',
      },
      menuItem: {
        padding: '0 12px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'auto',
      },
    };

    return (
      <Paper style={styles.menu}>
        <Menu
          autoWidth={false}
          menuItems={items}
          menuItemStyle={styles.menuItem}
          zDepth={0}
          selectedIndex={this._getSelectedIndex(items)}
          onItemClick={this._onMenuSelect} />
      </Paper>
    );
  },

  _getSelectedIndex(items) {
    let params = this.context.router.getCurrentParams();
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === params.id) {
        return i;
      }
    }
    return -1;
  },

  _onMenuSelect(e, i) {
    let entity = this.state.config.entities[i];
    if (entity) {
      this.context.router.transitionTo('entityTable', { id: entity.id });
    }
  },

});

export default EntityMenu;
