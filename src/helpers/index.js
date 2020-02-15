import _get from 'lodash.get';

export const getInputData = message => {
  if (!message) {
    return null;
  }

  switch (message.type) {
    case 'dialog':
      return {
        type: 'buttons',
        identifier: message.key,
        buttons: message.buttons.map((button, index) => ({
          text: button,
          payload: _get(message, `payloads[${index}]`, button),
        })),
      };
    case 'text':
      return {
        type: 'text',
        identifier: message.key,
      };
    default:
      return {
        type: 'buttons',
        identifier: message.key,
        buttons: [
          { text: 'RESTART', payload: '#init' }
        ],
      };
  }
};

export const getLastBrandMessage = messages => {
  const _messages = Object
    .values(messages)
    .sort((a, b) => a.timestamp - b.timestamp);

  for (let i = _messages.length - 1; i >= 0; i--) {
    if (_messages[i].samurai === undefined) {
      return _messages[i];
    }
  }
};