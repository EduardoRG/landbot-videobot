// system
import React, { useContext  } from 'react';
import PropTypes from 'prop-types';
import { Context as ConfigContext } from 'context/config';
import useLandbot from 'hooks/useLandbot';
import useVideoPlayer from 'hooks/useVideoPlayer';

// lib

// components
import Input from 'components/Input';
import PauseScreen from 'components/PauseScreen';
import EndScreen from 'components/EndScreen';
import VideoBot from './VideoBot';
import Video from 'components/Video';

export default function VideoBotWrapper(props) {
  const { video, debug } = useContext(ConfigContext);

  const { videoRef, loading, isPaused, finished, progress } = useVideoPlayer({
    autoplay: false,
    controls: true,
    muted: false,
    loop: false,
    sources: [{
      src: video,
      type: 'video/mp4',
    }]
  });

  useLandbot(progress);

  return (
    <VideoBot debug={debug}>
      <Video videoRef={videoRef} />
      <Input disabled={isPaused || finished} />
      <PauseScreen active={isPaused && !finished} />
      <EndScreen active={finished} />
    </VideoBot>
  );
}

VideoBotWrapper.propTypes = {};

VideoBotWrapper.defaultProps = {};

