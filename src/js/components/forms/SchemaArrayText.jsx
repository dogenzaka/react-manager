'use strict';

import React from 'react';
import i18n from '../../i18n';

import TagsInput from 'react-tagsinput';
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
    return this.refs.tags.getTags();
  },

  render() {

    let schema = this.props.schema;
    let error = this.state.error;
    let cols = schema.cols || 12;
    let styles = {
      array: {
        position: 'relative',
        marginTop: '10px',
      },
      label: {
        lineHeight: '36px',
        marginRight: '10px',
        color: 'rgba(0,0,0,0.5)',
      },
    };

    return (
      <div style={styles.array} className={"cols-"+cols}>
        <label style={styles.label}>{i18n(this.props.name)}</label>
        <TagsInput
          ref="tags"
          placeholder={i18n('Add')}
          valueLink={this.linkState('tags')}
          onChange={this.saveTags} />
      </div>
    );
  },

});

export default SchemaArrayText;
