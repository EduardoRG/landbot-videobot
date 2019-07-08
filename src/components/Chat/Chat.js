// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Chat(props) {
  return (
    <div style={{ height: '100%' }}>
      {props.isLoading && props.loader}
      <div style={{
        height: '50%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '2em',
      }}>
        {props.messages}
      </div>
      <div style={{
        height: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '2em',
      }}>
        {props.input}
      </div>
    </div>
  );
}

Chat.propTypes = {
  isLoading: PropTypes.bool,
  loader: PropTypes.element,
  messages: PropTypes.element,
  input: PropTypes.element,
};

Chat.defaultProps = {
  isLoading: false,
  loader: null,
  messages: null,
  input: null,
};
