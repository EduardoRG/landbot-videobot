// system
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// lib
import anime from 'animejs';

// components
import Buttons from './Buttons';

export default function ButtonsWrapper(props) {
  const buttonsRef = useRef(null);

  useEffect(() => {
    anime({
      targets: Array.from(buttonsRef.current.querySelectorAll('.Button')),
      translateY: 20,
      opacity: 1,
      delay: anime.stagger(200, { from: 'first' }),
      duration: 2000,
    });
  }, []);

  return (
    <Buttons
      buttons={props.buttons}
      buttonsRef={buttonsRef}
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
