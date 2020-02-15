// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Button(props) {
  return (
    <button
      className="Button button is-rounded"
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  text: '',
};
