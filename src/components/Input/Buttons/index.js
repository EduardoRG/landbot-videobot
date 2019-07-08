// system
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// lib
import anime from 'animejs';

// components
import Buttons from './Buttons';

export default function ButtonsWrapper(props) {
  useEffect(() => {
    anime({
      targets: '.Button',
      translateY: 20,
      opacity: 1,
      delay: anime.stagger(200, { from: 'first' }),
      duration: 2000,
    });
  }, []);

  return (
    <Buttons
      buttons={props.buttons}
      onButtonClick={props.onButtonClick}
    />
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
