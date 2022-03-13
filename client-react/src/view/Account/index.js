import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import EditableTextInput from '../../components/EditableTextInput';
import ErrorView from '../../components/ErrorView';
import Spinner from '../../components/Spinner';
import TextInput from '../../components/TextInput';
import useAccountApiCalls from '../../hooks/useAccountApiCalls';

const className = 'p-3 mb-4';

const defaultAccount = {
  firstName: '',
  lastName: '',
  email: '',
  building: '',
};

function Account() {
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [account, setAccount] = useState(defaultAccount);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [updatingFirstName, setUpdatingFirstName] = useState(false);
  const [updatingLastName, setUpdatingLastName] = useState(false);
  const { updateAccount, deleteAccount } = useAccountApiCalls({
    setAccount,
    setBusy,
    setError,
    setUpdatingEmail,
    setDeletingAccount,
  });
  const onChangeEmail = useCallback((val) => {
    setEmail(val);
  }, [])

  if (busy) return <Spinner />
  if (error) return <ErrorView />
  return (
    <div className="p-8">
      <div className={className}>
        <EditableTextInput
          defaultValue={account.firstName}
          save={(body) => updateAccount(setUpdatingFirstName, body)}
          busy={updatingFirstName}
          label="First name"
          valueKey="firstName"
        />
      </div>
      <div className={className}>
        <EditableTextInput
          defaultValue={account.lastName}
          save={(body) => updateAccount(setUpdatingLastName, body)}
          busy={updatingLastName}
          label="Last name"
          valueKey="lastName"
        />
      </div>
      <div className={className}>
        <EditableTextInput
          defaultValue={account.email}
          save={(body) => updateAccount(setUpdatingEmail, body)}
          busy={updatingEmail}
          label="Email"
          valueKey="email"
        />
      </div>
      <div className="mt-4 p-2 flex justify-end">
        <div className="w-64 mr-2">
          <TextInput value={email} onChange={onChangeEmail} placeholder="Type in your email to confirm" />
        </div>
        <div className="mt-1">
          <Button
            colour={email === account.email ? 'bg-red-700' : 'bg-gray-400'}
            value="Delete account"
            disabled={email !== account.email}
            onClick={deleteAccount}
            busy={deletingAccount}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
