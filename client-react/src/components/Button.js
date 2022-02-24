import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Button = ({ busy, disabled, value, onClick }) => {
  const onClickButton = () => {
    if (busy || disabled) return;
    onClick();
  };

  const classNames = useMemo(() => `rounded h-10 text-sm py-1 px-2 text-center min-w-32 text-white 
  ${busy || disabled ? 'bg-gray-300' : 'bg-teal-500'}`, [busy, disabled]);


  return <button onClick={onClickButton} className={classNames}>
    {value} {busy ? '...' : ''}
  </button>
};

Button.defaultProps = {
  busy: false,
  disabled: false,
  value: 'Submit'
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

export default Button;