// system
import React, { useState, useEffect } from 'react';
import core from 'core/landbot';
import { $inputRenderer } from 'core/pipelines';

// lib

// components
import Input from './Input';

export default function InputWrapper(props) {
  const [key, setKey] = useState(null);
  const [type, setType] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    const subscription = $inputRenderer.subscribe({
      next: (inputData) => {
        if (inputData) {
          setType(inputData.type);
          setButtons(inputData.buttons);
          setKey(inputData.identifier || Math.random().toString());
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
    setType(null);
    setKey(null);
  };

  const _onTextSubmit = (e) => {
    core.sendMessage({
      message: textValue,
    });
    e.preventDefault();
    setKey(null);
    setType(null);
    setTextValue('');
  };

  return (
    <Input
      key={key}
      buttons={buttons}
      onButtonClick={_onButtonClick}
      onTextChange={setTextValue}
      onTextSubmit={_onTextSubmit}
      textValue={textValue}
      type={type}
    />
  );
}
