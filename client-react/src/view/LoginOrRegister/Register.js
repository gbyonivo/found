import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import TextInput from '../../components/TextInput';
import { getRegistrationError } from '../../functions/error';
import foundAxios from '../../api/foundAxois';
import { UserContext } from '../../contexts/UserContextProvider';

function Register() {
  const { setToken } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState({});

  const register = async () => {
    setBusy(true);
    try {
      const { data: token } = await foundAxios.post('/accounts', {
        firstName, lastName, password, email, phone,
      });
      localStorage.setItem('token', token);
      setToken(token);
      setBusy(false);
      location.href = '/found/reports'; // eslint-disable-line
    } catch (e) {
      setError(getRegistrationError(e));
      setBusy(false);
    }
  };

  return (
    <div className="h-auto w-96 rounded p-2 font-light">
      <h2 className="text-white">Sign up</h2>
      <div className="mt-4 border-t border-gray-300 bg-white rounded px-4 py-6">
        <FormField label="First name" error={error.firstName}>
          <TextInput onChange={setFirstName} value={firstName} />
        </FormField>
        <FormField label="Last name" error={error.lastName}>
          <TextInput onChange={setLastName} value={lastName} />
        </FormField>
        <FormField label="Phone" error={error.phone}>
          <TextInput onChange={setPhone} value={phone} type="phone" />
        </FormField>
        <FormField label="Email" error={error.email}>
          <TextInput onChange={setEmail} value={email} type="email" />
        </FormField>
        <FormField label="Password" error={error.password}>
          <TextInput onChange={setPassword} value={password} type="password" />
        </FormField>
        <div className="mt-4 flex justify-right">
          <Button onClick={register} value="Sign up" busy={busy} />
        </div>
      </div>
    </div>
  );
}

export default Register;
