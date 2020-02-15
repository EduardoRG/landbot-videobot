// system
import React, { useContext } from 'react';
import { Context as ConfigContext } from 'context/config';

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
