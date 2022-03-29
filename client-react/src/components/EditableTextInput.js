import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { BiX, BiPencil } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';

const className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center ml-4';

function EditableTextInput({
  defaultValue, save, clear, label, type, fixed, valueKey,
}) {
  const [disabled, setDisabled] = React.useState(true);
  const [value, setValue] = React.useState(defaultValue);
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

  return (
    <div className="font-light editable-text-input">
      {label && <div className="mb-4">{label}</div>}
      <div className="border border-purple-200 rounded p-4 flex">
        <input
          value={value}
          onChange={onChange}
          disabled={disabled}
          type={type}
          className="flex-1 p-2 rounded font-light"
        />
        {!fixed && (
          disabled
            ? (
              <button onClick={clickEdit} className={`${className} editable-text-input__edit-btn`} type="button">
                <BiPencil size="30" />
              </button>
            )
            : (
              <>
                <button onClick={clickCancel} className={`${className} editable-text-input__cancel-btn`} type="button"><BiX size="30" /></button>
                <button onClick={clickSave} className={`${className} editable-text-input__save-btn`} type="button"><TiTick size="30" /></button>
              </>
            )
        )}
      </div>
    </div>
  );
}

EditableTextInput.defaultProps = {
  type: 'text',
  clear: false,
  fixed: false,
  save: () => {},
  valueKey: '',
  defaultValue: '',
  label: '',
};

EditableTextInput.propTypes = {
  save: PropTypes.func,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  clear: PropTypes.bool,
  fixed: PropTypes.bool,
  valueKey: PropTypes.string,
};

export default EditableTextInput;
