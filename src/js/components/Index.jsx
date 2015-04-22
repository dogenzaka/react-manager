'use strict';

import React from 'react';
import { Navigation } from 'react-router';
import AuthMixin from '../mixins/AuthMixin';
import { setTitle } from '../actions/HeaderAction';
import i18n from '../i18n';

export default React.createClass({

  mixins: [Navigation, AuthMixin],

  componentDidMount() {
    setTitle(i18n('SiteTitle'));
  },

  componentWillUnmount() {
  },

  render() {
    return (
      <div id="main" />
    );
  }

});
