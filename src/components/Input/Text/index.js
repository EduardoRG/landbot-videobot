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
  const inputLineRef = useRef(null);

  useEffect(() => {
    let _isActiveIframe = false;
    try {
      _isActiveIframe = (!iframe || window.top.document.activeElement === iframe);
    } catch (e) {
      console.error(e);
    }

    // Autofocus
    if (inputRef.current && _isActiveIframe) {
      inputRef.current.focus();
    }
    anime({
      targets: inputRef.current,
      opacity: 1,
      duration: 1000,
      delay: 500,
    });
    anime({
      targets: inputLineRef.current,
      scaleX: [0, 1],
      duration: 1500,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <Text
      inputRef={inputRef}
      inputLineRef={inputLineRef}
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
