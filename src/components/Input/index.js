// system
import React, { useEffect, useReducer } from 'react';
import core from 'core/landbot';
import { $inputRenderer } from 'core/pipelines';

// lib

// components
import Input from './Input';

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
      };
    case 'SET_TEXT_VALUE':
      return {
        ...state,
        textValue: action.value,
      };
    case 'RESET':
      return {
        ...state,
        key: Math.random().toString(),
        type: null,
        buttons: [],
        textValue: '',
      };
    default:
      return state;
  }
};

export default function InputWrapper(props) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const subscription = $inputRenderer.subscribe({
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
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const _onButtonClick = ({ text, payload }) => {
    core.sendMessage({
      type: 'button',
      message: text,
      payload: payload,
    });
    dispatch({ type: 'RESET' });
  };

  const _onTextSubmit = (e) => {
    core.sendMessage({
      message: state.textValue,
    });
    e.preventDefault();
    dispatch({ type: 'RESET' });
  };

  return (!!state.type ? (
    <Input
      key={state.key}
      buttons={state.buttons}
      onButtonClick={_onButtonClick}
      onTextChange={value => dispatch({ type: 'SET_TEXT_VALUE', value })}
      onTextSubmit={_onTextSubmit}
      textValue={state.textValue}
      type={state.type}
    />
    ) : null
  );
}
