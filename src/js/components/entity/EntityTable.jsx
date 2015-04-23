'use strict';

import _ from 'lodash';
import React from 'react';

import FloatingMenu from '../FloatingMenu.jsx';
import i18n from '../../i18n';

import EntityTableHeader from './EntityTableHeader.jsx';
import EntityTableBody from './EntityTableBody.jsx';

import ConfigStore from '../../stores/ConfigStore';

let EntityTable = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    let id = this.context.router.getCurrentParams().id;
    this.state.id = id;
    this.state.spec = _.find(ConfigStore.state.config.entities, entity => entity.id === id);
  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },

  componentWillUpdate() {
  },

  render() {

    return (
      <div className="entity__table">
        <table>
          <EntityTableHeader spec={this.state.spec} />
          <EntityTableBody spec={this.state.spec} />
        </table>
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


