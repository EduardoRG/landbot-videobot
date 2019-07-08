// system
import React, { useContext, useEffect } from 'react';
import { Context as ConfigContext } from 'context/config';
import { Context as DocumentContext } from 'context/document';

// lib

// components
import Theme from './Theme';

export default function ThemeWrapper(props) {
  const {
    primary,
    secondary,
    background,
    text,
    font,
  } = useContext(ConfigContext);

  const { document } = useContext(DocumentContext);
  
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://kit.fontawesome.com/692c52fac5.js';
    document.body.appendChild(s);
  }, []);

  return (
    <Theme
      primary={primary}
      secondary={secondary}
      background={background}
      text={text}
      font={font}
    />
  );
}
