import React from 'react';
import PropTypes from 'prop-types';

function FormField({ error, children, label }) {
  return (
    <div>
      {label && <div className="text-xs font-normal text-gray-500">{label}</div>}
      <div className="">
        {children}
      </div>
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  )
}

FormField.defaultProps = {
  label: '',
  error: '',
};

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  error: PropTypes.string,
};

export default FormField;
