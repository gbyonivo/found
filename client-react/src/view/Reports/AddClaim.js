import React, { useCallback, useContext, useState } from 'react';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import { AppStateContext } from '../../contexts/AppStateContextProvider';
import { ADD_CLAIM, DONE_ADDING_CLAIM, ERROR_ADDING_CLAIM } from '../../constants/actions';
import { createClaim } from '../../api/reports';
import ErrorView from '../../components/ErrorView';

function AddClaim() {
  const {
    state: { selectedReport, addingClaim, errorAddingClaim },
    dispatch,
  } = useContext(AppStateContext)
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const onChangeDescription = (value) => {
    setDescription(value);
    setError('');
  };

  const submitClaim = useCallback(() => {
    const submit = async () => {
      if (description.length < 20) {
        setError('can not be less than 20');
        return;
      }
      dispatch({ type: ADD_CLAIM });
      try {
        const { data } = await createClaim({ description, reportId: selectedReport.id });
        setDescription('');
        dispatch({ type: DONE_ADDING_CLAIM, payload: { claim: data } })
      } catch (e) {
        dispatch({ type: ERROR_ADDING_CLAIM, payload: { error: 'Error encountered adding claim' } });
      }
    }
    submit();
  }, [description, dispatch, selectedReport.id]);

  return (
    <div>
      <FormField label="Claim this item" error={error}>
        <TextInput value={description} onChange={onChangeDescription} large />
      </FormField>
      {errorAddingClaim && (
      <div className="my-2">
        <ErrorView error={errorAddingClaim} />
      </div>
      )}
      <div className="mt-4">
        <Button value="Submit claim" busy={addingClaim} onClick={submitClaim} />
      </div>

    </div>
  );
}

export default AddClaim;
