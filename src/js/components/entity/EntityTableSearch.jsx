'use strict';

import React from 'react';

import { IconButton } from 'material-ui';
import { toggleSearch, getEntityItems } from '../../actions/EntityAction';
import SchemaForm from '../forms/SchemaForm.jsx';
import EntityStore from '../../stores/EntityStore';

let EntityTableSearch = React.createClass({

  getInitialState() {
    return {
      height: 0
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
    EntityStore.addListener(this._setState);
    if (this.refs.form) {
      this.state.height = this.refs.form.getDOMNode().clientHeight;
    }
  },

  componentWillUnmount() {
    EntityStore.removeListener(this._setState);
  },

  componentWillUpdate() {
  },

  componentDidUpdate() {
    if (this.refs.form) {
      this.state.height = this.refs.form.getDOMNode().clientHeight;
    }
  },

  _setState(state) {
    if (state.showSearch) {
      this.setState(state);
    } else if (state.showSearch === false) {
      this.setState(state);
    }
  },

  render() {

    let spec = this.props.spec;

    let icon;
    if (spec.features.search) {
      icon = (
        <div className="entity__menu__search__icon">
          <IconButton iconClassName="md-search md-2x" onClick={this._didClick} />
        </div>
      );
    } else {
      return <div />;
    }

    let height = 0;
    if (this.state.showSearch) {
      height = this.state.height;
    }

    let style = { height: height };

    let schema = this.props.spec.features.search.schema || {
      type: 'object', properties: { query: 'string' }
    };

    return (
      <div className="entity__menu__search" ref="body" style={style}>
        {icon}
        <div className="entity__menu__search__form">
          <SchemaForm
            ref="form"
            name="search"
            mini={true}
            schema={schema}
            onChange={this._didChange}
          />
        </div>
      </div>
    );
  },

  _didClick() {
    toggleSearch();
  },

  _didChange(value) {
    this.state.query = value;
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    this.state.timeoutId = setTimeout(() => {
      this.state.timeoutId = 0;
      getEntityItems(this.props.spec.id, { query: this.state.query });
    }, 200);
  }

});

export default EntityTableSearch;
