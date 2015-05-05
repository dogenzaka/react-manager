'use strict';

import React from 'react';
import mui from 'material-ui';
import SchemaForm from '../forms/SchemaForm.jsx';

let { ClickAwayable } = mui.Mixins;

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
    if (this.refs.container) {
      this.refs.container.getDOMNode().style.right = '0px';
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
    return (
      <div className="entity__table__form mui-paper mui-z-depth-1" ref="container">
        <div className="entity__table__form__container">
          <SchemaForm
            ref="form"
            name={spec.name}
            schema={spec.schema}
            value={this.state.value}
            onCancel={this._didCancel}
            onSubmit={this._didSubmit}
          />
        </div>
      </div>
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
    if (this.refs.container) {
      this.refs.container.getDOMNode().style.right = '-610px';
      setTimeout(() => {
        this.setState({ value: null });
      }, 200);
    }
  },

});

export default EntityForm;
