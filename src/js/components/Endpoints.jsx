'use strict';

import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';

import { expandTitle } from '../actions/HeaderAction';
import { selectEndpoint, addEndpoint, updateEndpoint, removeEndpoint } from '../actions/EndpointAction';

import FloatingMenu from './FloatingMenu.jsx';
import EndpointStore from '../stores/EndpointStore';
import RowMenu from './RowMenu.jsx';
import SchemaForm from './forms/SchemaForm.jsx';
import DialogWrapper from './DialogWrapper.jsx';

import i18n from '../i18n';

let { FontIcon } = mui;

import { Theme } from '../styles';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      endpoints: EndpointStore.state.endpoints
    };
  },

  componentWillMount() {
    this.dialogCount = 0;
    expandTitle(true);
  },

  componentDidMount() {
    EndpointStore.addListener(this._setState);
  },

  componentWillUnmount() {
    EndpointStore.removeListener(this._setState);
    expandTitle(false);
  },

  getDialogKey() {
    return "dialog"+(++this.dialogCount);
  },

  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', cols: 4 },
      url: { type: 'string', format: 'url', cols: 8 },
    },
    required: ['name','url'],
  },

  render() {

    let styles = {
      endpoints: {
        height: 'calc(100% - 64px)',
        paddingTop: '64px',
      },
      header: {
        position: 'fixed',
        display: 'flex',
        width: '100%',
        paddingLeft: '70px',
        lineHeight: '48px',
        color: Theme.palette.textSecondColor,
        zIndex: 2,
        background: '#fff',
        fontWeight: 'bold',
        borderBottom: '1px solid ' + Theme.palette.borderColor,
      },
      headerName: {
        width: '180px',
      },
      items: {
        paddingTop: '48px',
        height: 'calc(100% - 48px)',
        overflow: 'scroll',
      },
      item: {
        display: 'flex',
        position: 'relative',
        padding: '16px 0 16px 14px',
        cursor: 'pointer',
      },
      itemMark: {
        width: '48px',
        padding: '10px 0 0 10px',
        color: Theme.palette.accent1Color,
      },
      itemName: {
        lineHeight: '48px',
        width: '180px',
      },
      itemUrl: {
        lineHeight: '48px',
        marginRight: 'auto',
      },
    };

    let menuItems = _.map(this.state.endpoints, endpoint => {
      // Get active mark
      let selected = endpoint.selected ?
        <FontIcon className="md-done md-2x" /> : <div />;

      let controlItems = [
        { payload: endpoint, text: i18n('Edit'), iconClassName: 'md-edit md-15x' },
        { payload: endpoint, text: i18n('Delete'), iconClassName: 'md-delete md-15x' },
      ];

      return (
        <div className="hover" style={styles.item} key={endpoint.name} onClick={this._didSelect(endpoint)}>
          <div style={styles.itemMark}>{selected}</div>
          <div style={styles.itemName}>{endpoint.name}</div>
          <div style={styles.itemUrl}>{endpoint.url}</div>
          <RowMenu items={controlItems} onClickItem={this._didClickRowMenu} />
        </div>
      );
    });

    return (
      <div id="main">
        <FloatingMenu position="top" onClickAdd={this._didClickAdd} ref="floatingMenu" />
        <div style={styles.endpoints}>
          <div style={styles.header}>
            <div style={styles.headerName}>{i18n('Name')}</div>
            <div>{i18n('URL')}</div>
            <div></div>
          </div>
          <div style={styles.items}>
            {menuItems}
          </div>
        </div>
        <div id="dialog"></div>
      </div>
    );
  },

  _setState(state) {
    if (state.selected) {
      this.context.router.transitionTo('index');
      return;
    }
    if (this._dialog) {
      this._dialog.dismiss();
      this._dialog = null;
    }
    this.setState({
      endpoints: state.endpoints
    });
  },

  _didClickAdd() {
    this._dialog = React.render(
      <DialogWrapper key={this.getDialogKey()} title={i18n('Add an endpoint')} onDismiss={this._didDismissDialog}>
        <SchemaForm
          schema={this.schema}
          value={{}}
          onSubmit={this._didSubmitAdd}
          onCancel={this._didCancel}
        />
      </DialogWrapper>, document.getElementById("dialog"));
    this._dialog.show();
    this.refs.floatingMenu.rotateIcon(true);
  },

  _didSubmitAdd(endpoint) {
    addEndpoint(endpoint);
  },

  _didSubmitEdit(index, endpoint) {
    endpoint.index = index;
    updateEndpoint(endpoint);
  },

  _didCancel() {
    this._dialog.dismiss();
    let node = React.findDOMNode(this._dialog);
    React.unmountComponentAtNode(node);
    this._dialog = null;
  },

  _didDismissDialog() {
    this.refs.floatingMenu.rotateIcon(false);
  },

  _didSelect(endpoint) {
    return () => {
      selectEndpoint(endpoint);
    };
  },

  _didClickRowMenu(e, i, item) {
    e.stopPropagation();
    if (i === 0) {
      // Edit
      this._dialog = React.render(
        <DialogWrapper key={this.getDialogKey()} title={i18n('Edit an endpoint')} onDismiss={this._didDismissDialog}>
          <SchemaForm
            schema={this.schema}
            value={item.payload}
            onSubmit={this._didSubmitEdit.bind(this, item.payload.index)}
            onCancel={this._didCancel}
          />
        </DialogWrapper>, document.getElementById("dialog"));
      this._dialog.show();
    }
    if (i === 1) {
      // Remove
      removeEndpoint(item.payload);
    }
  },

});

