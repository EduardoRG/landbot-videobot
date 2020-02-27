// system
import React, { useContext } from 'react';

// lib

const Context = React.createContext({});

const Provider = props => (
  <Context.Provider value={props.value}>{props.children}</Context.Provider>
);

const withConfig = WrappedComponent => props => (
  <Context.Consumer>
    {contextProps => (
      <WrappedComponent config={contextProps} {...props} />
    )}
  </Context.Consumer>
);

const useConfigContext = () => useContext(Context);

export { Context, Provider, withConfig, useConfigContext };
