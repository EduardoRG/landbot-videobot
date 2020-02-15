// system
import { useEffect, useContext } from 'react';
import { Context as ConfigContext } from 'context/config';
import core from 'core/landbot';
import { getInputData, getLastBrandMessage } from 'helpers';
import { inputRenderer$ } from 'core/pipelines';

// lib
import LandbotCore from '@landbot/core';

export default function useLandbot() {
  const { configUrl } = useContext(ConfigContext);

  useEffect(() => {
    // Landbot internal config fetch.
    LandbotCore.utils.asyncUtils.fetch({ url: configUrl })
      .then(_config => {
        core.setConfig(_config);
        core
          .init()
          .then(data => {
            if (!data.isNewSession) {
              inputRenderer$.next(
                getInputData(getLastBrandMessage(data.messages))
              );
            }
          });
      });

    const onMessageReceptionBinding = onMessageReception.bind(null);

    // Listen to incoming messages.
    core.events.on('new_message', onMessageReceptionBinding);

    // Unsubscribe on unmount.
    return () => core.events.off('new_message', onMessageReceptionBinding);
  }, [configUrl]);
}

function onMessageReception(message) {
  if (message.samurai !== undefined) {
    inputRenderer$.next( getInputData(message) );
  }
}