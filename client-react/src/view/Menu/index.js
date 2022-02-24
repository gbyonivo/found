import React, { useContext, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';

const navLinkClass = 'p-4';

const Menu = () => {
  const { user, retry, setToken } = useContext(UserContext);
  useEffect(() => {
    if (!user) retry();
  }, [user, retry]);

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!user) return <div>We are having issues trying to load your details.</div>
  return <div className="flex h-screen space-between">
    <div className="flex flex-col h-full bg-lime-800 text-white font-light justify-between pb-8 text-sm">
      <div className="flex flex-col">
        <NavLink to="accounts" className={navLinkClass}>My profile</NavLink>
        <NavLink to="reports" className={navLinkClass}>Reports</NavLink>
      </div>
      <div>
        <NavLink to="/" className={navLinkClass} onClick={signOut}>Sign out</NavLink>
      </div>
    </div>
    <Outlet />
  </div>
};

export default Menu;