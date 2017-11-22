import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

const FormGroup = ({ touched, error, children }) => (
  <div
    className={`form-group ${cs({
      'has-danger': touched && error,
      'has-success': touched && !error
    })}`}
  >
    {children}
    {error && touched && <div className="form-control-feedback">{error}</div>}
  </div>
);

FormGroup.defaultProps = {
  touched: false,
  error: ''
};

FormGroup.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default FormGroup;
