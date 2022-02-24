import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navLinkClass = 'p-4';

const deleteToken = () => {
  localStorage.removeItem('token');
};

const Menu = () => {
  return <div className="flex h-screen space-between">
    <div className="flex flex-col h-full bg-lime-800 text-white font-light">
      <div className="flex flex-col">
        <NavLink to="accounts" className={navLinkClass}>My profile</NavLink>
        <NavLink to="reports" className={navLinkClass}>Reports</NavLink>
      </div>
      <div>
        <NavLink to="/" className={navLinkClass} onClick={deleteToken}>Sign out</NavLink>
      </div>
    </div>
    <Outlet />
  </div>
};

export default Menu;