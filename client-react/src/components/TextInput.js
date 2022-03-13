import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const basicClassName = {
  normal: 'px-2 my-1 h-10 text-sm',
  large: 'px-2 h-16 my-1 text-lg',
};

function TextInput({
  value, type, onChange, error, large, placeholder,
}) {
  const size = useMemo(() => (large ? 'large' : 'normal'), [large])
  const onChangeText = ({ target }) => {
    onChange(target.value);
  };
  const classNames = useMemo(() => `${basicClassName[size]} w-full rounded border border-gray-100 text-xs ${error ? 'border-red-200' : 'border-gray-200 '}`, [error, size])

  return (
    <input
      className={classNames}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeText}
    />
  )
}

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  type: 'text',
  error: false,
  large: false,
};

TextInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  large: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextInput;
