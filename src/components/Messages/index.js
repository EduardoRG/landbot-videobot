// system
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import core from 'core/landbot';
import { Context as ConfigContext } from 'context/config';
import { $chunkReceptor, $receptorObservable } from 'core/pipelines';
import { getLastBotMessagesSequence } from 'helpers';

// lib
import LandbotCore from '@landbot/core';

// components
import Message from 'components/Message';
import Messages from './Messages';

export default function MessagesWrapper(props) {
  const { configUrl } = useContext(ConfigContext);

  useEffect(() => {
    LandbotCore.utils.asyncUtils.fetch({
      url: configUrl,
    })
      .then(_config => {
        core.setConfig(_config);
        core
          .init()
          .then(data => {
            if (!data.isNewSession) {
              const lastSequence = getLastBotMessagesSequence(data.messages);
              $chunkReceptor.next(lastSequence);
            }
            props.setIsLoading(false);
          });
      });

    // Listen to incoming messages
    const subscription = core.pipelines.$sequence.subscribe(message =>
      $receptorObservable.next(message)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Messages>
      <Message />
    </Messages>
  );
}

MessagesWrapper.propTypes = {
  setIsLoading: PropTypes.func,
};

MessagesWrapper.defaultProps = {
  setIsLoading: () => {},
};
