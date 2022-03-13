import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Reports from './view/Reports';
import ReportDetails from './view/Reports/ReportDetails';
import Menu from './view/Menu';
import reportWebVitals from './reportWebVitals';
import LoginOrRegister from './view/LoginOrRegister';
import UserContextProvider from './contexts/UserContextProvider';
import AppStateContextProvider from './contexts/AppStateContextProvider';
import Account from './view/Account';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <AppStateContextProvider>
          <Routes>
            <Route path="/" element={<LoginOrRegister />} />
            <Route path="found" element={<Menu />}>
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:id" element={<ReportDetails />} />
              <Route path="accounts" element={<Account />} />
            </Route>
          </Routes>
        </AppStateContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
