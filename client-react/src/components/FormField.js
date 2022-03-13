import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ error, children, label }) => {
  return <div>
    {label && <label className="text-xs font-normal text-gray-500">{label}</label>}
    <div className="">
      {children}
    </div>
    {error && <div className="text-xs text-red-500">{error}</div>}
  </div>
}

FormField.defaultProps = {
  label: '',
  error: '',
}

FormField.propTpyes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  error: PropTypes.string.isRequired
};

export default FormField;