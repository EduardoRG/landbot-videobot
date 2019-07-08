// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Buttons(props) {
  return (
    <div className="Buttons buttons">
      {props.buttons.map((button, index) =>
        <button
          key={`Button-${index}`}
          className="Button button is-rounded"
          onClick={(e) => {
            e.preventDefault();
            props.onButtonClick(button);
          }}
        >
          {button.text}
        </button>
      )}
    </div>
  );
}

Buttons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    payload: PropTypes.string,
  })),
  onButtonClick: PropTypes.func,
};

Buttons.defaultProps = {
  buttons: [],
  onButtonClick: () => {},
};
