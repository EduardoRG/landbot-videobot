// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Text(props) {
  return (
    <div className="InputText">
      <input
        className="InputText__input input"
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Type here..."
        ref={props.inputRef}
        value={props.value}
        type="text"
      />
      <div className="InputText__line"></div>
    </div>
  );
}

Text.propTypes = {
  inputRef: PropTypes.object,
};

Text.defaultProps = {
  inputRef: null,
};
