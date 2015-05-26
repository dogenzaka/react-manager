'use strict';

import React from 'react';

import { IconButton, Paper } from 'material-ui';
import { toggleSearch, getEntityItems } from '../../actions/EntityAction';
import SchemaForm from '../forms/SchemaForm.jsx';
import EntityStore from '../../stores/EntityStore';

import { Theme } from '../../styles';

let EntityTableSearch = React.createClass({

  getInitialState() {
    return {
      height: 0,
      query: {},
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
    EntityStore.addListener(this._setState);
    if (this.refs.form) {
      this.state.height = React.findDOMNode(this.refs.form).clientHeight;
    }
  },

  componentWillUnmount() {
    EntityStore.removeListener(this._setState);
    this.state.query = {};
  },

  componentWillUpdate() {
  },

  componentDidUpdate() {
    if (this.refs.form) {
      this.state.height = React.findDOMNode(this.refs.form).clientHeight;
    }
  },

  componentWillReceiveProps() {
    this.state.query = {};
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

    if (!spec.features.search) {
      return <div/>;
    }

    let styles = {
      icon: {
        position: 'absolute',
        zIndex: 11,
        right: '4px',
        top: '8px',
      },
      body: {
      },
      search: {
        position: 'absolute',
        top: '40px',
        right: '0px',
        width: '400px',
        overflow: 'hidden',
        height: ((this.state.showSearch) ? this.state.height+40 : 0) + 'px',
        transition: 'height 0.3s cubic-bezier(0.39, 0.58, 0.59, 0.96)',
        padding: '16px 8px 0px 8px',
        zIndex: 5,
      },
    };

    let iconClass = this.state.showSearch ? 'md-close' : 'md-search';
    let icon = (
      <div style={styles.icon}>
        <IconButton iconClassName={iconClass + ' md-2x'} iconStyle={{color:Theme.palette.textLightColor}} onClick={this._didClick} />
      </div>
    );

    let schema = this.props.spec.features.search.schema || {
      type: 'object', properties: { query: 'string' }
    };

    return (
      <div style={styles.body}>
        {icon}
        <Paper style={styles.search}>
          <SchemaForm
            ref="form"
            name="search"
            mini={true}
            schema={schema}
            value={this.state.query}
            onChange={this._didChange}
          />
        </Paper>
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
