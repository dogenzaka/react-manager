'use strict';

import React from 'react';

import FloatingMenu from '../FloatingMenu.jsx';
import i18n from '../../i18n';

import EntityTableHeader from './EntityTableHeader.jsx';
import EntityTableBody from './EntityTableBody.jsx';

import AppStore from '../../stores/AppStore';
import ConfigStore from '../../stores/ConfigStore';

let EntityTable = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this._setup();
  },

  componentDidMount() {
    AppStore.addListener(this._setAppState);
    this._resize();
  },

  componentWillUnmount() {
    AppStore.removeListener(this._setAppState);
  },

  componentWillUpdate() {
    this._setup();
  },

  _setAppState(state) {
    if (state.size) {
      this._resize();
    }
  },

  _resize() {
    let header = this.refs.header.getDOMNode();
    let body = this.refs.body.getDOMNode();
    header.style.width = body.clientWidth + 'px';
  },

  _setup() {
    let id = this.context.router.getCurrentParams().id;
    this.state.id = id;
    this.state.spec = ConfigStore.getEntitySpec(id);
  },

  render() {

    return (
      <div className="entity__table">
        <EntityTableHeader spec={this.state.spec} ref="header" />
        <EntityTableBody spec={this.state.spec} ref="body" />
        <FloatingMenu position="bottom" onClickAdd={this._didClickAdd} ref="floatingMenu" />
      </div>
    );
  },

  _getTitle() {
    return i18n('Entity') + ' - ' + i18n(this.state.id);
  },

  _didClickAdd() {
    this.refs.floatingMenu.rotateIcon(true);
  },

});

export default EntityTable;


