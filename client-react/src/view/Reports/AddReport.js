import React, { useContext, useState } from 'react';
import { createReport } from '../../api/reports';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { ADD_REPORT, DONE_ADDING_REPORT, ERROR_ADDING_REPORT } from '../../constants/actions';
import { AppStateContext } from '../../contexts/AppStateContextProvider';

const AddReport = () => {
  const { dispatch, state: { addingReport } } = useContext(AppStateContext);
  const [itemName, setItemName] = useState('');
  const onChange = (value) => {
    setItemName(value);
  };
  const onClick = async () => {
    dispatch({ type: ADD_REPORT });
    try {
      const { data } = await createReport({ itemName });
      setItemName('');
      dispatch({ type: DONE_ADDING_REPORT, payload: { report: data } });
    } catch (e) {
      dispatch({ type: ERROR_ADDING_REPORT, payload: { error: e } });
    }
  }
  return <div className="p-4 w-96 bg-slate-700 rounded-lg">
    <div className="mb-2">
      <TextInput value={itemName} onChange={onChange} large />
    </div>
    <Button value="Report an item" onClick={onClick} busy={addingReport} />
  </div>;
};

export default AddReport;