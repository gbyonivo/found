import React, { useContext, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaPiedPiperSquare } from 'react-icons/fa';
import { ImExit, ImTux } from 'react-icons/im';
import { UserContext } from '../../contexts/UserContextProvider';

const navLinkClass = 'p-4 border-b border-pink-700';

const menu = [
  { to: 'accounts', Icon: ImTux, title: 'profile' },
  { to: 'reports', Icon: FaPiedPiperSquare, title: 'reports' }
];

const Menu = () => {
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
  return <div className="flex h-screen space-between bg-gray-200">
    <div className="flex flex-col h-full bg-pink-900 text-white font-light justify-between pb-2 text-xs">
      <div className="flex flex-col text-center">
        {menu.map(({ title, to, Icon }) => <NavLink key={title} to={to} className={navLinkClass}>
        <div className="flex justify-center mb-2"><Icon size={30} /></div>
          {title}
        </NavLink>
        )}
      </div>
      <div className="text-center w-full cursor-pointer flex flex-col p-4 justify-center" role="button" onClick={signOut}>
        <div className="flex justify-center mb-2"><ImExit size={30} /></div>
        Sign out
      </div>
    </div>
    <Outlet />
  </div>
};

export default Menu;