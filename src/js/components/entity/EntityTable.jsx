'use strict';

import React from 'react';

import FloatingMenu from '../FloatingMenu.jsx';
import i18n from '../../i18n';

import EntityTableSearch from './EntityTableSearch.jsx';
import EntityTableHeader from './EntityTableHeader.jsx';
import EntityTableBody from './EntityTableBody.jsx';
import EntityForm from './EntityForm.jsx';

import AppStore from '../../stores/AppStore';
import ConfigStore from '../../stores/ConfigStore';
import EntityStore from '../../stores/EntityStore';

import { updateEntity } from '../../actions/EntityAction';

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
    EntityStore.addListener(this._setEntityState);
    this._resize();
  },

  componentWillUnmount() {
    AppStore.removeListener(this._setAppState);
    EntityStore.removeListener(this._setEntityState);
  },

  componentWillUpdate() {
    this._setup();
  },

  _setAppState(state) {
    if (state.size) {
      this._resize();
    }
  },

  _setEntityState(state) {
    if (state.type === 'update') {
      // Update entity
      this.refs.form.refs.form.setState({ done: true });
      this.refs.form.dismiss();
    } else if (state.type === 'updateFail') {
      // Update fail
      this.refs.form.refs.form.setState({ saving: false });
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
        <EntityTableSearch spec={this.state.spec} ref="search" />
        <EntityTableHeader spec={this.state.spec} ref="header" />
        <EntityTableBody spec={this.state.spec} ref="body" onEdit={this._didEdit} />
        <EntityForm ref="form" spec={this.state.spec} onSubmit={this._didSubmit} />
        <FloatingMenu position="bottom" onClickAdd={this._didClickAdd} ref="floatingMenu" />
      </div>
    );
  },

  _getTitle() {
    return i18n('Entity') + ' - ' + i18n(this.state.id);
  },

  _didClickAdd() {
    this.refs.form.show({});
  },

  _didEdit(item) {
    this.refs.form.show(item);
  },

  _didSubmit(item) {
    updateEntity(this.state.spec, item);
  },

});

export default EntityTable;


