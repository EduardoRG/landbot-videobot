import React from 'react';
import PropTypes from 'prop-types';
// import { useDocumentContext } from 'context/document';

// components
import EndScreen from './EndScreen';

export default function EndScreenWrapper(props) {
  // const { window } = useDocumentContext();

  // function onClick() {
  //   // This is not working well.
  //   window.location.reload();
  // }

  return (
    <EndScreen active={props.active} />
  );
}

EndScreenWrapper.propTypes = {
  active: PropTypes.bool,
};

EndScreenWrapper.defaultProps = {
  active: false,
};