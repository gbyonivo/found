import React from 'react';
import Login from './Login';
import Register from './Register';

const LoginOrRegister = () => {
  return <div className="flex w-full bg-red-200 h-screen">
    <div className="w-2/4 bg-pink-900 pt-24 flex justify-center">
      <Login />
    </div>
    <div className="w-2/4 bg-lime-900 pt-24 flex justify-center">
      <Register />
    </div>
  </div>
};

export default LoginOrRegister;
