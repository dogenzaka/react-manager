'use strict';

import React from 'react';
import AuthMixin from '../mixins/AuthMixin';
import { setTitle } from '../actions/HeaderAction';
import i18n from '../i18n';

export default React.createClass({

  mixins: [AuthMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    setTitle(i18n('site.title'));
  },

  render() {
    return (
      <div id="main" />
    );
  }

});
