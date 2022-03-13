import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { BiX, BiPencil } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';

const className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center ml-4';

const EditableTextInput = ({ defaultValue, save, clear, busy, label, type, fixed, valueKey }) => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(defaultValue);
  const onChange = ({ target }) => {
    setValue(target.value)
  };
  const clickEdit = useCallback(() => {
    setDisabled(false);
    if (clear) setValue('');
  }, [clear]);

  const clickCancel = useCallback(() => {
    setDisabled(true);
    setValue(defaultValue);
  }, [defaultValue]);

  const clickSave = useCallback(() => {
    save(valueKey ? { [valueKey]: value } : value);
    setDisabled(true);
  }, [save, value, valueKey]);

  return <div className="font-light">
    {label && <div className="mb-4">{label}</div>}
    <div className="border border-purple-200 rounded p-4 flex">
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className="flex-1 p-2 rounded font-light"
      />
      {!fixed && <>
        {disabled
          ? <button onClick={clickEdit} className={className}>
            <BiPencil size="30" />
          </button>
          : <>
            <button onClick={clickCancel} className={className}><BiX size="30" /></button>
            <button onClick={clickSave} className={className}><TiTick size="30" /></button>
          </>
        }
      </>}
    </div>
  </div>;
}

EditableTextInput.defaultProps = {
  type: 'text',
  clear: false,
  fixed: false,
};

EditableTextInput.propTypes = {
  save: PropTypes.func,
  defaultValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clear: PropTypes.bool.isRequired,
  fixed: PropTypes.bool.isRequired,
  valueKey: PropTypes.string
};

export default EditableTextInput;