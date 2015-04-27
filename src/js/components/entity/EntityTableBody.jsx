'use strict';

import React from 'react';

import { getEntityItems, updateEntityField } from '../../actions/EntityAction';

import _ from 'lodash';
import EntityTableRow from './EntityTableRow.jsx';
import EntityStore from '../../stores/EntityStore';

let EntityTableBody = React.createClass({

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {
      spec: this.props.spec,
      fields: this.props.spec.features.list.fields,
      list: [],
      range: { start: 0, end: 40 },
      rowHeight: 48,
      prefetch: 40
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
    let spec = this.props.spec;
    EntityStore.addListener(this._setState);
    getEntityItems(spec.id);
    this._setRowCount();
  },

  componentWillUnmount() {
    EntityStore.removeListener(this._setState);
  },

  _setState(state) {
    if (state.list) {
      let list = this.state.list;
      // Update list
      if (list.length < state.offset + state.list.length) {
        list.length = state.offset + state.list.length;
      }
      for (let i = 0; i < state.list.length; i++) {
        list[i + state.offset] = state.list[i];
      }
      if (state.offset === 0) {
        this.refs.body.getDOMNode().scrollTop = 0;
      }
      this.setState({ list: list });
    }
    if (state.field) {
      // Update field
      _.each(this.refs, component => {
        if (!component.state) {
          return;
        }
        if (component.state.item === state.item) {
          let field = component.field(state.field.id);
          field.props.value = state.value;
          field.setState({ editing: false });
        }
      });
    }
  },

  componentWillReceiveProps(props) {
    this.setState({
      spec: props.spec,
      fields: props.spec.features.list.fields,
      list: [],
    });
    getEntityItems(props.spec.id);
  },

  render() {

    let list = this.state.list;
    let fields = this.state.fields;
    let range = this.state.range;
    let spec = this.state.spec;

    let rows = list.slice(range.start, range.end).map((item, i) => {
      return <EntityTableRow
        key={i}
        ref={"row_"+i}
        spec={spec}
        item={item}
        fields={fields}
        onChange={this._didChange}
        onChangeField={this._didChangeField}
      />;
    });

    let rowHeight = this.state.rowHeight;
    let marginTop = range.start * rowHeight;
    let height = (list.length - range.start) * rowHeight;

    let style = {
      height: height,
      marginTop: marginTop
    };

    return (
      <div className="entity__table__body" onScroll={this._didScroll} ref="body">
        <div className="entity__table__scroll" style={style}>
          {rows}
        </div>
      </div>
    );

  },

  _loadMore() {
    let spec = this.props.spec;
    let offset = this.state.list.length;
    getEntityItems(spec.id, { offset: offset });
  },

  _didChange() {
  },

  _didChangeField(row, field, value) {
    let spec = this.props.spec;
    let item = row.state.item;
    updateEntityField({
      spec: spec,
      item: item,
      field: field,
      value: value
    });
  },

  _didScroll() {

    let body = this.refs.body;
    let bodyNode = body.getDOMNode();
    let scrollHeight = bodyNode.scrollHeight;
    let scrollTop = bodyNode.scrollTop;
    let bodyHeight = bodyNode.clientHeight;
    let rowHeight = this.state.rowHeight;
    let range = this.state.range;
    let rowCount = this.state.rowCount;

    if (scrollTop + bodyHeight >= scrollHeight) {
      this._loadMore();
    }

    let start = Math.max(0, Math.floor(scrollTop / rowHeight));
    let end = start + rowCount;

    if (range.start !== start || range.end !== end) {
      this.setState({ range: { start: start, end: end }});
    }
  },

  _setRowCount() {
    let bodyNode = this.refs.body.getDOMNode();
    let bodyHeight = bodyNode.clientHeight;
    let rowHeight = this.state.rowHeight;
    this.state.rowCount = Math.ceil(bodyHeight / rowHeight) + 1;
  },

});

export default EntityTableBody;

