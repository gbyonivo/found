import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import TextInput from '../../components/TextInput';
import { getLoginError } from '../../functions/error';
import foundAxios from '../../api/foundAxois';
import { UserContext } from '../../contexts/UserContextProvider';

const Login = () => {
  const { setToken } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    setBusy(true);
    try {
      const { data: token } = await foundAxios.post('/login', { password, email });
      localStorage.setItem('token', token);
      setToken(token);
      location.href = '/found/reports'; // eslint-disable-line
    } catch (e) {
      setError(getLoginError(e));
      setBusy(false);
    }
  };


  return <div className="h-auto w-96 rounded p-2 font-light">
    <h2 className="text-white">Sign in</h2>
    <div className="mt-4 border-t border-gray-300 bg-white rounded px-4 py-6">
      <FormField label="Email">
        <TextInput onChange={setEmail} value={email} type="email" />
      </FormField>
      <FormField label="Password">
        <TextInput onChange={setPassword} value={password} type="password" />
      </FormField>
      {error &&<div className="my-2 text-xs text-red-500">{error}</div>}
      <div className="mt-4 flex justify-right">
        <Button onClick={login} value="Sign in" busy={busy} />
      </div>
    </div>
  </div>;
};

export default Login;
