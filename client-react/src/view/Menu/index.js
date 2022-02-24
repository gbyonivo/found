import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navLinkClass = 'p-4';

const Menu = () => {
  return <div className="flex h-screen">
    <div className="h-full bg-slate-700 text-white font-light flex flex-col">
      <NavLink to="accounts" className={navLinkClass}>My profile</NavLink>
      <NavLink to="reports" className={navLinkClass}>Reports</NavLink>
    </div>
    <Outlet />
  </div>
};

export default Menu;