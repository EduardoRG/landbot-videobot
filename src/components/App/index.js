// system
import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ConfigProvider } from 'context/config';

// lib

// components
import App from './App';
import Chat from 'components/Chat';
import Theme from 'components/Theme';

export default function AppWrapper(props) {
  return (
    <ConfigProvider value={props.config}>
      <App>
        <Theme />
        <Chat />
      </App>
    </ConfigProvider>
  );
}

AppWrapper.propTypes = {
  config: PropTypes.object,
};

AppWrapper.defaultProps = {
  config: {},
};
