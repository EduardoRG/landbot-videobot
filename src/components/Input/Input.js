// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components
import Buttons from './Buttons';
import Text from './Text';

export default function Input(props) {
  return (
    <div className="Input">
      <form
        className="Input__form is-marginless"
        onSubmit={props.onTextSubmit}
      >
        {props.type === 'text' &&
          <Text
            onChange={props.onTextChange}
            value={props.textValue}
          />
        }
        {(props.type === 'buttons' || props.type === 'restart') &&
          <Buttons
            buttons={props.buttons}
            onClick={props.onButtonClick}
          />
        }
      </form>
    </div>
  );
}

Input.propTypes = {
  buttons: PropTypes.array,
  onButtonClick: PropTypes.func,
  onTextChange: PropTypes.func,
  onTextSubmit: PropTypes.func,
  textValue: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  buttons: [],
  onButtonClick: () => {},
  onTextChange: () => {},
  onTextSubmit: () => {},
  textValue: '',
  type: null,
};
