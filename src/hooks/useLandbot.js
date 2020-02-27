// system
import { useState, useEffect, useContext} from 'react';
import { Context as ConfigContext } from 'context/config';
import core from 'core/landbot';
import _get from 'lodash.get';
import { getInputData, getNextMessage, parseTime, getButtonData } from 'helpers';
import { inputRenderer$, throttleTimeline$, videoTimeline$, lastMessage$, humanExecution$ } from 'core/pipelines';

// lib
import LandbotCore from '@landbot/core';
import { take, takeUntil } from 'rxjs/operators';

export default function useLandbot() {
  const [loading, setLoading] = useState(true);
  const { configUrl } = useContext(ConfigContext);

  useEffect(() => {
    // Landbot internal config fetch.
    LandbotCore.utils.asyncUtils.fetch({ url: configUrl })
      .then(_config => {
        core.setConfig({ ..._config, storage_off: true }); // No revisit support for now
        core.init().then(() => setLoading(false));
      });

    const onMessageReceptionBinding = onMessageReception.bind(null);
    const onMessageSendingBinding = onMessageSending.bind(null);

    // Listen to incoming messages.
    core.events.on('new_message', onMessageReceptionBinding);
    // Listen to leaving messages.
    core.events.on('send_message', onMessageSendingBinding);

    // Unsubscribe on unmount.
    return () => {
      core.events.off('new_message', onMessageReceptionBinding);
      core.events.off('send_message', onMessageSendingBinding);
    };
  }, [configUrl]);

  return { loading };
}

function onMessageReception(message) {
  if (message.samurai !== undefined && message.action !== 'finish') {
    lastMessage$.next(message);

    // START
    const startTime = parseTime(_get(message, 'extra.start', '0'));
    const startTimeSubscription = throttleTimeline$.pipe(takeUntil(humanExecution$)).subscribe(time => {
      if (time >= startTime) {
        inputRenderer$.next( getInputData(message) );
        startTimeSubscription.unsubscribe();
      }
    });

    // DEFAULT
    const defaultTime = parseTime(_get(message, 'extra.default', '0'));
    const defaultEndTime = getButtonData(message.buttons[0]).timeRange[1];
    const nextMessageSending = () => {
      core.sendMessage( getNextMessage(message) );
    };
    const defaultTimeSubscription = throttleTimeline$.pipe(takeUntil(humanExecution$)).subscribe(time => {
      if (time >= defaultTime) {
        nextMessageSending();
        inputRenderer$.next( null );
        defaultTimeSubscription.unsubscribe();
      }
    });

    // END
    const endTime = parseTime(_get(message, 'extra.end', '0'));
    const defaultEndTimeSubscription = throttleTimeline$.pipe(takeUntil(humanExecution$)).subscribe(time => {
      if (time >= defaultEndTime) {
        videoTimeline$.next(endTime);
        defaultEndTimeSubscription.unsubscribe();
      }
    });

    const resetBinding = reset.bind(null);
    core.events.once('send_message', resetBinding);

    function reset() {
      humanExecution$.next(true);
    }
  }
}

function onMessageSending(message) {
  core.sendMessage(message);

  const optionData = getButtonData(message.message);
  
  const optionStartTime = optionData.timeRange[0];
  const optionEndTime = optionData.timeRange[1];

  // Jump to the selected option scene.
  videoTimeline$.next(optionStartTime);

  lastMessage$.pipe(take(1)).subscribe(message => {
    const endTime = parseTime(_get(message, 'extra.end', '0'));

    // When the scene end is reached, jump to next sequence.
    const optionEndTimeSubscription = throttleTimeline$.subscribe(time => {
      if (time >= optionEndTime) {
        videoTimeline$.next(endTime);
        optionEndTimeSubscription.unsubscribe();
      }
    });
  });
}