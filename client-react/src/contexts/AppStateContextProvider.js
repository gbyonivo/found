import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reportsReducer, { initialState } from '../reducers/reports';

export const AppStateContext = createContext();

const AppStateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportsReducer, initialState);

  return <AppStateContext.Provider value={{ state, dispatch }}>
    {children}
  </AppStateContext.Provider>
};

AppStateContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppStateContextProvider;
