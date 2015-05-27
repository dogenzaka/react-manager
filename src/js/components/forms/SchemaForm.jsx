'use strict';

import React from 'react';
import { FlatButton, RaisedButton, FontIcon } from 'material-ui';
import _ from 'lodash';
import tv4 from 'tv4';
import tv4formats from 'tv4-formats';
tv4.addFormat(tv4formats);

import SchemaItem from './SchemaItem.jsx';
import { Theme } from '../../styles';
import i18n from '../../i18n';

/**
 * SchemaForm is generating form from JSON schema definitions
 */
class SchemaForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._didSubmit = this._didSubmit.bind(this);
    this._didCancel = this._didCancel.bind(this);
    this._didChange = this._didChange.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: Theme,
    };
  }

  componentWillMount() {
    this._setProps(this.props);
  }

  componentWillReceiveProps(props) {
    this._setProps(props);
    this.state.saving = false;
  }

  _setProps(props) {
    let schema = props.schema || { type: 'object', properties: [] };
    this.state.schema = this._normalizeSchema(schema);
    this.state.value = props.value || {};
  }

  getValue() {
    let value = this.refs.item.getValue();
    this._shrinkValue(value);
    return value;
  }

  _shrinkValue(value) {
    _.each(value, (val, name) => {
      if (val === undefined || val === null || val === '') {
        delete value[name];
      } else if (typeof val === 'object') {
        this._shrinkValue(val);
      }
    });
  }

  render() {
    let schema = this.state.schema;
    let value = this.state.value;
    let saving = !!this.state.saving;
    let done = !!this.state.done;


    let styles = {
      buttons: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginRight: '16px',
        marginTop: '10px',
      },
      button: {
        marginLeft: '8px',
      },
    };

    let buttons;

    if (this.props.fixedButtons) {
      styles.buttons.position = 'fixed';
      styles.buttons.bottom = '8px';
      styles.buttons.right = '4px';
      styles.buttons.zIndex = '5';
    }

    if (this.props.onSubmit) {

      let submitLabel = this.props.submitLabel || i18n('Save');
      let submitButton = saving ? (
        <RaisedButton primary={true} type="submit" onClick={this._didSubmit}>
          <FontIcon className="md-spin-reverse md-loop md-2x .schema-form__icon" />
        </RaisedButton> ) : (
        <RaisedButton label={submitLabel} primary={true} type="submit" onClick={this._didSubmit} /> );
      if (done) {
        submitButton = <RaisedButton label={i18n('Done')} type="button" />;
      }

      buttons = (
        <div style={styles.buttons}>
          <div style={styles.button}>
            {submitButton}
          </div>
          <div style={styles.button}>
            <FlatButton type="button" label={i18n("Cancel")} onClick={this._didCancel} iconClassName="md-cancel" />
          </div>
        </div>
      );
    }

    return (
      <div style={styles.form}>
        <SchemaItem
          form={this}
          name=""
          path=""
          schema={schema}
          value={value}
          errors={this.state.errors}
          mini={this.props.mini}
          onChange={this._didChange}
          onSubmit={this._didSubmit}
          ref="item" />
        {buttons}
      </div>
    );
  }

  /**
   * Normalize schema
   */
  _normalizeSchema(schema) {
    if (typeof schema === 'string') {
      return { type: schema };
    }
    if (schema.type === 'object') {
      var props = {};
      _.each(schema.properties || {}, (value,key) => {
        props[key] = this._normalizeSchema(value);
      });
      schema.properties = props;
    }
    if (schema.type === 'array') {
      schema.items = this._normalizeSchema(schema.items);
    }
    return schema;
  }

  _validate(value) {
    return tv4.validateMultiple(value, this.state.schema);
  }

  _didChange() {
    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  }

  _didSubmit() {
    // Get value from current form
    let value = this.getValue();
    console.info("Submitting schema form", value);

    let result = this._validate(value);
    if (result.valid) {
      if (this.props.onSubmit) {
        this.props.onSubmit(value);
        this.setState({ saving: true, value: value });
      }
    } else {
      console.error("SchemaForm validation failed", result);
      this.setState({ errors: result.errors, value: value });
    }
  }

  _didCancel(e) {
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }
  }
}

SchemaForm.propTypes = {
  name: React.PropTypes.string,
  schema: React.PropTypes.object.isRequired,
  value: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onChange: React.PropTypes.func,
  submitLabel: React.PropTypes.string,
  mini: React.PropTypes.bool,
  fixedButtons: React.PropTypes.bool,
};

SchemaForm.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default SchemaForm;
