// system
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import core from 'core/landbot';
import { inputRenderer$ } from 'core/pipelines';

// lib

// components
import Input from './Input';
import Buttons from './Buttons';
import Text from './Text';

const initialState = {
  key: Math.random().toString(),
  type: null,
  buttons: [],
  textValue: '',
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT_DATA':
      return {
        ...state,
        ...action.data,
        key: Math.random().toString(),
      };
    case 'SET_TEXT_VALUE':
      return {
        ...state,
        textValue: action.value,
      };
    case 'RESET':
      return {
        ...initialState,
        key: Math.random().toString(),
      };
    default:
      return state;
  }
};

export default function InputWrapper(props) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const subscription = inputRenderer$.subscribe({
      next: (inputData) => {
        if (inputData) {
          dispatch({
            type: 'SET_INPUT_DATA',
            data: {
              key: inputData.identifier || Math.random().toString(),
              type: inputData.type,
              buttons: inputData.buttons,
            },
          });
        } else {
          dispatch({ type: 'RESET' });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const _onButtonClick = ({ text, payload }) => {
    core.events.emit('send_message', {
      type: 'button',
      message: text,
      payload: payload,
    });
    dispatch({ type: 'RESET' });
  };

  const _onTextSubmit = (e) => {
    core.events.emit('send_message', {
      message: state.textValue,
    });
    e.preventDefault();
    dispatch({ type: 'RESET' });
  };

  return (
    <Input disabled={state.type === null || props.disabled}>
      {state.type === 'text' &&
        <Text
          key={state.key}
          onChange={value => dispatch({
            type: 'SET_TEXT_VALUE',
            value,
          })}
          onSubmit={_onTextSubmit}
          value={state.textValue}
        />
      }
      {state.type === 'buttons' &&
        <Buttons
          key={state.key}
          buttons={state.buttons}
          onButtonClick={_onButtonClick}
        />
      }
    </Input>
  );
}

InputWrapper.propTypes = {
  disabled: PropTypes.bool,
};

InputWrapper.defaultProps = {
  disabled: false,
};
