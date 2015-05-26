'use strict';

import _ from 'lodash';
import React from 'react';
import { Dialog } from 'material-ui';

import i18n from '../../i18n';
import EntityTableRow from './EntityTableRow.jsx';
import EntityStore from '../../stores/EntityStore';
import EntityForm from './EntityForm.jsx';
import { getEntityItems, updateEntityField, removeEntity } from '../../actions/EntityAction';

let EntityTableBody = React.createClass({

  contextTypes: {
    router: React.PropTypes.func,
  },

  propTypes: {
    spec: React.PropTypes.object,
  },

  getInitialState() {
    return {
      spec: this.props.spec,
      fields: this.props.spec.features.list.fields,
      list: [],
      range: { start: 0, end: 40 },
      query: null,
      rowHeight: 48,
      prefetch: 40
    };
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
    if (state.type === 'list') {
      if (state.offset === 0) {
        this.refs.body.getDOMNode().scrollTop = 0;
        this.state.list = [];
      }
      let list = this.state.list;
      // Update list
      if (list.length < state.offset + state.list.length) {
        list.length = state.offset + state.list.length;
      }
      for (let i = 0; i < state.list.length; i++) {
        list[i + state.offset] = state.list[i];
      }
      this.setState({ list: list, query: state.query });
    } else if (state.type === 'updateField') {
      // Update field
      _.each(this.refs, component => {
        if (!component.state) {
          return;
        }
        if (component.state.item === state.item) {
          let field = component.field(state.field.id);
          field.setState({ editing: false, value: state.value });
        }
      });
    } else if (state.type === 'remove') {
      let list = this.state.list;
      list = _.filter(list, (item) => item !== state.item);
      this.setState({ list: list });
      this.refs.removeDialog.dismiss();
      // get 1 more item which is deleted
      getEntityItems(this.props.spec.id, { offset: list.length, limit: 1, query: this.state.query });
    } else if (state.showSearch === true) {
      this.setState({ showSearch: true });
    } else if (state.showSearch === false) {
      this.setState({ showSearch: false });
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

  componentDidUpdate() {
    if (this.refs.removeDialog) {
      this.refs.removeDialog.show();
    }
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
        onChangeField={this._didChangeField}
        onEdit={this._didEdit}
        onRemove={this._didRemoveConfirm}
      />;
    });

    let rowHeight = this.state.rowHeight;
    let marginTop = range.start * rowHeight;
    let height = (list.length - range.start) * rowHeight;

    let removeConfirm;

    if (this.state.deletingItem) {
      let removeActions = [
        { text: i18n('Cancel') },
        { text: i18n('Delete'), onClick:this._didRemove, ref:'submit' },
      ];
      removeConfirm = (
        <Dialog
          ref="removeDialog"
          title={i18n("Deleting the entity")}
          actions={removeActions}
          actionFocus='submit'
          onDismiss={this._didDismissRemove}
          dismissOnClickAway={true}>
          {i18n('Are you sure to delete the entity?')}
        </Dialog>
      );
    }

    let styles = {
      body: {
        height: 'calc(100% - 40px)',
        overflow: 'scroll',
        marginTop: '40px',
      },
      scroll: {
        height: height,
        marginTop: marginTop
      }
    };

    return (
      <div style={styles.body} onScroll={this._didScroll} ref="body">
        <div style={styles.scroll}>
          {rows}
        </div>
        <EntityForm
          ref="editForm"
          spec={this.props.spec}
          onSubmit={this._didSubmit}
        />
        {removeConfirm}
      </div>
    );

  },

  _loadMore() {
    let spec = this.props.spec;
    let offset = this.state.list.length;
    let query = this.state.query;
    getEntityItems(spec.id, { offset: offset, query: query });
  },

  _didEdit(row, item) {
    if (this.props.onEdit) {
      this.props.onEdit(item);
    }
  },

  _didChangeField(row, field, value) {
    let spec = this.props.spec;
    let item = row.state.item;
    updateEntityField(spec, item, field, value);
  },

  _didRemoveConfirm(row, item) {
    this.setState({ deletingItem: item });
  },

  _didDismissRemove() {
    this.state.deletingItem = null;
  },

  _didRemove() {
    removeEntity(this.props.spec, this.state.deletingItem);
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

