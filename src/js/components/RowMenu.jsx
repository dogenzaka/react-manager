'use strict';

import React from 'react';
import mui from 'material-ui';

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

  propTypes: {
    items: React.PropTypes.array,
    onClickItem: React.PropTypes.func,
  },

  getInitialState() {
    return {
      open: false
    };
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  componentClickAway() {
    this.setState({ open: false });
  },

  render() {

    let items = this.props.items || [];
    let menuItems = items.map(item => {
      return item;
    });
    let classes = this.getClasses('mui-drop-down-menu row-menu', {
      'mui-open': this.state.open
    });

    return (
      <div className={classes}>
        <IconButton iconClassName="md-more-vert md-2x" onClick={this._didClick} />
        <Menu
          ref="menu"
          autoWidth={true}
          menuItems={menuItems}
          hideable={true}
          visible={this.state.open}
          onItemClick={this._didClickItem}
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
