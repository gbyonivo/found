import React, { useState } from 'react';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import TextInput from '../../components/TextInput';
import foundAxios from '../../helper/foundAxois';

const Register = () => {
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
      const token = await foundAxios.post('/accounts', { firstName, lastName, password, email, phone });
      console.log(token);
      setBusy(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setBusy(false);
    }
  };


  return <div className="h-auto w-96 rounded p-2 font-light">
    <h2>Sign up</h2>
    <div className="mt-4 border-t border-gray-300 bg-white rounded px-4 py-6">
      <FormField label="First name">
        <TextInput onChange={setFirstName} value={firstName} />
      </FormField>
      <FormField label="Last name">
        <TextInput onChange={setLastName} value={lastName} />
      </FormField>
      <FormField label="Phone">
        <TextInput onChange={setPhone} value={phone} type="phone" />
      </FormField>
      <FormField label="Email">
        <TextInput onChange={setEmail} value={email} type="email" />
      </FormField>
      <FormField label="Password">
        <TextInput onChange={setPassword} value={password} type="password" />
      </FormField>
      <div className="mt-4 flex justify-right">
        <Button onClick={register} value="Sign up" busy={busy} />
      </div>
    </div>
  </div>;
};

export default Register;
