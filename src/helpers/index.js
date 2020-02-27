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
      return null;
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

export const getNextMessage = message => {
  let nextMessage = {};
  if (message.type === 'dialog') {
    nextMessage = {
      type: 'button',
      message: message.buttons[0],
      payload: message.payloads[0],
    };
  } else {
    nextMessage = {
      type: 'button',
      message: 'Continue',
    };
  }
  return nextMessage;
};

/**
 * @example
 * parseTime("01:24") === 84
 */
export const parseTime = timeString => {
  return timeString
    .split(':')
    .reverse()
    .reduce((result, next, index) => {
      return result + parseInt(next) * Math.pow(60, index);
    }, 0);
};

/**
 * @example
 * getButtonData("[00:25, 01:24] Ascensor")
 *  === { timeRange: [25, 84], label: 'Ascensor' }
 */
export const getButtonData = (buttonLabel) => {
  const labelMatches = buttonLabel.match(/^\[(.*,.*)\](.*)/);
  const timeRangeString = labelMatches[1];
  const timeRangeSplit = timeRangeString.split(',');

  return {
    timeRange: [parseTime(timeRangeSplit[0]), parseTime(timeRangeSplit[1])],
    label: labelMatches[2].trim(),
  };
};