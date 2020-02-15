// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

// style

export default function VideoBot(props) {
  return (
    <div className="VideoBot" data-debug={props.debug}>
      {props.children}
    </div>
  );
}

VideoBot.propTypes = {
  debug: PropTypes.bool,
};

VideoBot.defaultProps = {
  debug: false,
};

