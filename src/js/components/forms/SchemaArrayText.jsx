'use strict';

import React from 'react';
import i18n from '../../i18n';
import TagsInput from 'react-tagsinput'

import { TextField } from 'material-ui';
import { ValidateMixin } from './SchemaMixin';

let SchemaArrayText = React.createClass({
  displayName: "Texts Component",

  mixins: [ValidateMixin, React.addons.LinkedStateMixin],

  propTypes: {
    name: React.PropTypes.string,
    schema: React.PropTypes.object,
    value: React.PropTypes.array,
    onChange: React.PropTypes.func,
    error: React.PropTypes.object,
  },

  getInitialState() {
    console.info('init.array', this.props.value);
    return {
      tags: this.props.value,
      errors: this.props.error,
    };
  },

  componentWillReceiveProps(props) {
    this.state.tags = props.value;
    this.state.error = props.error;
  },

  getValue() {
    return this.refs.tags.getTags().join(', ');
  },

  saveTags() {
    console.info('tags: ', this.refs.tags.getTags().join(', '));
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let cols = schema.cols || 12;
    let localizedLabel = i18n(this.props.name);
    let placeholder = 'Add ' + localizedLabel

    return (
      <div className={"schema-form__item schema-form__item--array cols-"+cols}>
        <label>{localizedLabel}</label>
        <TagsInput
          ref="tags"
          placeholder={placeholder}
          valueLink={this.linkState('tags')}
          onChange={this.saveTags} />
      </div>
    );
  },

});

export default SchemaArrayText;
