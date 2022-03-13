import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';
import Login from './Login';
import Register from './Register';

function LoginOrRegister() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  useEffect(() => {
    if (token) navigate('/found/reports');
  }, [token, navigate])

  return (
    <div className="flex w-full bg-red-200 h-screen">
      <div className="w-2/4 bg-pink-900 pt-24 flex justify-center">
        <Login />
      </div>
      <div className="w-2/4 bg-lime-900 pt-24 flex justify-center">
        <Register />
      </div>
    </div>
  )
}

export default LoginOrRegister;
