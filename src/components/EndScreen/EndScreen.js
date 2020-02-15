import React from 'react';
import PropTypes from 'prop-types';

export default function PauseScreen(props) {
  return (
    <div
      className="EndScreen is-overlay is-flex"
      data-active={props.active}
      onClick={props.onClick}
    >
      <h2 className="uses-color-primary is-size-4 has-text-weight-bold">The End</h2>
      <p className="uses-color-primary">Refresh page to replay</p>
    </div>
  );
}

PauseScreen.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

PauseScreen.defaultProps = {
  active: false,
  onClick: () => {},
};