'use strict';

import React from 'react';
import mui from 'material-ui';

import { Theme } from '../styles';

let { IconButton, Menu } = mui;
let { ClickAwayable, Classable } = mui.Mixins;

/**
 * RowMenu is menu components for rows in data table.
 *
 * let items = [
 *   { payload: "p1", text: "Item1" },
 *   { payload: "p2", text: "Item2" },
 * ];
 * <RowMenu items={items} onClickItem={this._onClick} />
 */
export default React.createClass({

  mixins: [Classable, ClickAwayable],

  manuallyBindClickAway: true,

  propTypes: {
    items: React.PropTypes.array,
    onClickItem: React.PropTypes.func,
  },

  getInitialState() {
    return {
      open: false
    };
  },

  componentClickAway() {
    this.setState({ open: false });
  },

  componentDidUpdate() {
    if (this.state.open) {
      this._bindClickAway();
    } else {
      this._unbindClickAway();
    }
  },

  styles: {
    menu: {
      position: 'absolute',
      right: '2px',
    },
    icon: {
      color: Theme.palette.textColor,
    },
    item: {
      paddingLeft: '16px',
    },
    itemIcon: {
      lineHeight: '32px',
      color: Theme.palette.textSecondColor,
    },
  },

  render() {

    let items = this.props.items || [];
    let menuItems = items.map(item => {
      return item;
    });
    let style = this.props.style;

    return (
      <div style={style}>
        <IconButton iconClassName="md-more-vert md-2x" style={this.styles.icon} onClick={this._didClick} />
        <Menu
          ref="menu"
          autoWidth={true}
          menuItems={menuItems}
          hideable={true}
          visible={this.state.open}
          onItemClick={this._didClickItem}
          style={this.styles.menu}
          menuItemStyle={this.styles.item}
        />
      </div>
    );
  },

  _didClick(e) {
    this.setState({ open: !this.state.open });
    e.stopPropagation();
  },

  _didClickItem(e, i, item) {
    if (this.props.onClickItem) {
      this.props.onClickItem(e, i, item);
    }
  },

});
