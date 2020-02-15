import React from 'react';
import PropTypes from 'prop-types';

export default function PauseScreen(props) {
  return (
    <div
      className="PauseScreen is-overlay is-flex"
      data-active={props.active}
    >
      <h2 className="uses-color-primary is-size-4 has-text-weight-bold">Paused</h2>
      <p className="uses-color-primary">Click to play</p>
    </div>
  );
}

PauseScreen.propTypes = {
  active: PropTypes.bool,
};

PauseScreen.defaultProps = {
  active: false,
};