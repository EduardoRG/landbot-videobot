// system
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Context as DocumentContext } from 'context/document';

// lib
import anime from 'animejs';

// components
import Text from './Text';

export default function TextWrapper(props) {
  const { window, iframe } = useContext(DocumentContext);
  const inputRef = useRef(null);

  useEffect(() => {
    // Autofocus
    if (!iframe || window.top.document.activeElement === iframe) {
      inputRef.current.focus();
    }

    anime({
      targets: '.InputText__input',
      opacity: 1,
      duration: 1000,
      delay: 500,
    });
  
    anime({
      targets: '.InputText__line',
      scaleX: [0, 1],
      duration: 1500,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <Text
      inputRef={inputRef}
      onChange={props.onChange}
      // onKeyDown={e => {
      //   const keyCode = e.keyCode || e.which;
      //   if (keyCode === 13) {
      //     props.onSubmit();
      //   }
      // }}
      value={props.value}
    />
  );
}

TextWrapper.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

TextWrapper.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  value: '',
};
