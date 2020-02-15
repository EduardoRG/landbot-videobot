// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Input(props) {
  return (
    <div className="Input" data-disabled={props.disabled}>
      <form
        className="Input__form is-marginless"
        onSubmit={e => e.preventDefault()}
      >
        {props.children}
      </form>
    </div>
  );
}

Input.propTypes = {
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
};
