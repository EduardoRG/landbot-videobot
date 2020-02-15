// system
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context as ConfigContext } from 'context/config';

// lib

// components
import Video from './Video';

export default function VideoWrapper(props) {
  const { video } = useContext(ConfigContext);

  return (
    <Video src={video} videoRef={props.videoRef} />
  );
}

VideoWrapper.propTypes = {
  videoRef: PropTypes.object,
};

VideoWrapper.defaultProps = {
  videoRef: null,
};

