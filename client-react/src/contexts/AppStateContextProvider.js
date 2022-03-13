import React, { createContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import reportsReducer, { initialState } from '../reducers/reports';

export const AppStateContext = createContext();

function AppStateContextProvider({ children }) {
  const [state, dispatch] = useReducer(reportsReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

AppStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppStateContextProvider;
