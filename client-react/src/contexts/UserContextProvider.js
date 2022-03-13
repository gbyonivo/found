import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(token ? jwtDecode(token) : null)
  const retry = () => {
    const t = localStorage.getItem('token');
    setToken(t);
    setUser(t ? jwtDecode(t) : null);
  };

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  return <UserContext.Provider value={{ user, retry, token, setToken }}>
    {children}
  </UserContext.Provider>
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired
};

export default UserContextProvider;
