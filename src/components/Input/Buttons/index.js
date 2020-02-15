// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components
import Button from './Button';
import Buttons from './Buttons';

export default function ButtonsWrapper(props) {
  return (
    <Buttons>
      {props.buttons.map(button => 
        <Button
          key={button.payload}
          text={button.text}
          onClick={() => props.onButtonClick(button)}
        />
      )}
    </Buttons>
  );
}

ButtonsWrapper.propTypes = {
  buttons: PropTypes.array,
  onButtonClick: PropTypes.func,
};

ButtonsWrapper.defaultProps = {
  buttons: [],
  onButtonClick: () => {},
};
