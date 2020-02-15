// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Buttons(props) {
  return (
    <div className="Buttons buttons">
      {props.children}
    </div>
  );
}

Buttons.propTypes = {};

Buttons.defaultProps = {};
