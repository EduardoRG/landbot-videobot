// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Message(props) {
  return (
    <div className="Message">
      <h1
        className="Message__content is-size-4"
        ref={props.messageRef}
      ></h1>
    </div>
  );
}

Message.propTypes = {
  messageRef: PropTypes.object,
};

Message.defaultProps = {
  messageRef: null,
};
