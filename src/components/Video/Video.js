// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

// style


/**
 * @see https://www.w3schools.com/html/html5_video.asp
 * ------------------------------------------
 * | Browser            | MP4 | WebM  | Ogg |
 * | Internet Explorer  | X   |       |     |
 * | Chrome             | X   | X     | X   |
 * | Firefox            | X   | X     | X   |
 * | Safari             | X   |       |     |
 * | Opera              | X   |       | X   |
 * ------------------------------------------
 */
const TYPES = {
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  OGG: 'video/ogg',
};

export default function Video(props) {
  return (
    <div data-vjs-player>
      <video
        className="Video"
        ref={props.videoRef}
      />
    </div>
  );
}

Video.propTypes = {
  onLoad: PropTypes.func,
  src: PropTypes.string,
  videoRef: PropTypes.object,
};

Video.defaultProps = {
  onLoad: () => {},
  src: null,
  videoRef: null,
};

