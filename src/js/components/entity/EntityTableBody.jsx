'use strict';

import React from 'react';

import { getEntityItems } from '../../actions/EntityAction';

import EntityTableRow from './EntityTableRow.jsx';
import EntityStore from '../../stores/EntityStore';

let EntityTableBody = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {
      fields: this.props.spec.features.list.fields,
      list: [],
    };
  },

  componentWillMount() {
    let spec = this.props.spec;
    EntityStore.addListener(this._setState);
    getEntityItems(spec.id);
  },

  componentDidMount() {
  },

  componentWillUnmount() {
    EntityStore.removeListener(this._setState);
  },

  _setState(state) {
    let list = this.state.list;
    if (list.length < state.offset + state.list.length) {
      list.length = state.offset + state.list.length;
    }
    for (let i = 0; i < state.list.length; i++) {
      list[i + state.offset] = state.list[i];
    }
    this.setState({
    });
  },

  _setAppState(state) {
    if (state.size) {
      this._resize();
    }
  },

  componentWillReceiveProps(props) {
    this.setState({
      fields: props.spec.features.list.fields
    });
  },

  _resize() {
  },

  render() {

    let list = this.state.list;
    let fields = this.state.fields;

    let rows = list.map((item, i) => {
      return <EntityTableRow
        key={i}
        item={item}
        fields={fields}
        onChange={this._onChange}
      />;
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );

  },

  _onChange() {
  },

});

export default EntityTableBody;

