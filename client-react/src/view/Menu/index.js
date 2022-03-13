/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useContext, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaPiedPiperSquare } from 'react-icons/fa';
import { ImExit, ImTux } from 'react-icons/im';
import { SiIconfinder } from 'react-icons/si';

import { UserContext } from '../../contexts/UserContextProvider';

const navLinkClass = 'p-4 flex';

const menu = [
  { to: 'accounts', Icon: ImTux, title: 'Account' },
  { to: 'reports', Icon: FaPiedPiperSquare, title: 'Reports' },
];

function Menu() {
  const { user, retry, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) retry();
  }, [user, retry]);

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  if (!user) return <div>We are having issues trying to load your details.</div>
  return (
    <div className="flex h-screen space-between bg-gray-200">
      <div className="flex flex-col h-full bg-slate-900 w-48 text-white font-light pb-2 text-md">
        <div className="p-4 flex justify-center border-b border-slate-800"><SiIconfinder size={50} /></div>
        <div className="flex flex-col text-center border-b border-slate-800">
          {menu.map(({ title, to, Icon }) => (
            <NavLink key={title} to={to} className={navLinkClass}>
              <div className="flex justify-center mr-4"><Icon size={22} /></div>
              {title}
            </NavLink>
          ))}
        </div>
        <div
          className="text-center w-full cursor-pointer flex mt-4 p-4"
          role="button"
          onClick={signOut}
        >
          <div className="flex mr-4"><ImExit size={22} /></div>
          Sign out
        </div>
      </div>
      <div className="flex-1 overflow-auto h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Menu;
