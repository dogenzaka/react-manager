'use strict';

import tv4 from 'tv4';

let ValidateMixin = {

  validate() {

    let value = this.getValue();
    let schema = this.props.schema;

    // Validate only when value exists
    if (value || (value && value.length > 0)) {
      let result = tv4.validateResult(value, schema);
      if (result.valid) {
        this.setState({ error: null, value: value });
      } else {
        this.setState({ error: result.error, value: value });
      }
    } else {
      this.setState({ error: null, value: null });
    }

    // Delegate to onChange property
    if (this.props.onChange) {
      setTimeout(() => {
        this.props.onChange(value);
      }, 0);
    }

  }

};

export { ValidateMixin };
