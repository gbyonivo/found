import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function UserContextProvider({ children }) {
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

  const value = useMemo(() => ({
    user, retry, token, setToken,
  }), [token, user])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserContextProvider;
