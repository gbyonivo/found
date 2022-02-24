import React, { useMemo } from 'react';
import PropTypes from 'prop-types';


const TextInput = ({ value, type, onChange, error }) => {
  const onChangeText = ({ target: { value } }) => {
    onChange(value);
  };
  const classNames = useMemo(() =>
  `px-2 my-1 h-10 w-full rounded border border-gray-100 text-xs ${error ? 'border-red-200' : 'border-gray-200 ' }`, [error])


  return <input
    className={classNames}
    type = {type}
    value={value}
    onChange={onChangeText}
  />
};

TextInput.defaultProps = {
  value: '',
  type: 'text',
  error: false,
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};

export default TextInput;
