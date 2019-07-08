// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

const dynamicStyle = props =>
`:root {
  --primary: ${props.primary};
  --secondary: ${props.secondary};
  --background: ${props.background};
  --text: ${props.text};
  --font: '${props.font}';
}`;

export default function Theme(props) {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" />
      {process.env.NODE_ENV === 'development' &&
        <link rel="stylesheet" href="./main.css" />
      }
      {process.env.NODE_ENV === 'production' &&
        <link rel="stylesheet" href="https://static.landbot.io/landbot-widgets/landbot-typed/main.css" />
      }
      <link href={`https://fonts.googleapis.com/css?family=${props.font}`} rel="stylesheet" />
      <style>{dynamicStyle(props)}</style>
    </>
  );
}

Theme.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  background: PropTypes.string,
  text: PropTypes.string,
  font: PropTypes.string,
};

Theme.defaultProps = {
  primary: '#ffc631',
  secondary: '#009879',
  background: '#0f1720',
  text: 'white',
  font: 'Montserrat',
};
