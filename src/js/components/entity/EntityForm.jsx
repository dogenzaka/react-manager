'use strict';

import React from 'react';
import mui from 'material-ui';
import SchemaForm from '../forms/SchemaForm.jsx';

let { ClickAwayable } = mui.Mixins;
let { Paper } = mui;

let EntityForm = React.createClass({

  mixins: [ClickAwayable],

  manuallyBindClickAway: true,

  contentTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    spec: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  },

  getInitialState() {
    return { spec: this.props.spec };
  },

  componentWillReceiveProps(props) {
    this.state.spec = props.spec;
  },

  componentDidUpdate() {
    if (this.refs.body) {
      React.findDOMNode(this.refs.body).style.right = '0px';
      this._bindClickAway();
    } else {
      this._unbindClickAway();
    }
  },

  componentClickAway() {
    this.dismiss();
  },

  render() {
    if (this.state.value) {
      return this.renderForm();
    } else {
      return <div />;
    }
  },

  renderForm() {

    let spec = this.state.spec;
    let styles = {
      form: {
        position: 'fixed',
        top: '64px',
        background: '#fff',
        zIndex: 3,
        width: '600px',
        right: '-610px',
        height: 'calc(100% - 64px)',
        transitionProperty: 'right',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-out',
        padding: '0 16px 0 16px',
      },
      container: {
        height: 'calc(100% - 52px)',
        overflow: 'scroll',
      },
    };

    return (
      <Paper style={styles.form} ref="body">
        <div style={styles.container}>
          <SchemaForm
            ref="form"
            name={spec.name}
            schema={spec.schema}
            value={this.state.value}
            fixedButtons={true}
            onCancel={this._didCancel}
            onSubmit={this._didSubmit}
          />
        </div>
      </Paper>
    );
  },

  _didCancel() {
    this.dismiss();
    if (this.props.onCancel) {
      this.props.onCancel(this);
    }
  },

  _didSubmit(item) {
    if (this.props.onSubmit) {
      this.props.onSubmit(item);
    }
  },

  show(value) {
    this.setState({
      value: value || {},
    });
  },

  dismiss() {
    if (this.refs.body) {
      React.findDOMNode(this.refs.body).style.right = '-610px';
      setTimeout(() => {
        this.setState({ value: null });
      }, 200);
    }
  },

});

export default EntityForm;
