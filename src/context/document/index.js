// system
import React from 'react';

// lib

const Context = React.createContext({
  document,
  iframe: null,
  window,
});

const Provider = props => (
  <Context.Provider value={props.value}>{props.children}</Context.Provider>
);

const withDocument = WrappedComponent => props => (
  <Context.Consumer>
    {contextProps => (
      <WrappedComponent document={contextProps} {...props} />
    )}
  </Context.Consumer>
);

export { Context, Provider, withDocument };
