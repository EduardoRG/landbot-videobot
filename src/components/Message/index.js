// system
import React, { useRef, useEffect } from 'react';
import { $chunkReceptor, $bufferedReceptor, $inputRenderer } from 'core/pipelines';
import { getInputData } from 'helpers';

// lib
import Typed from 'typed.js';

// components
import Message from './Message';

export default function MessageWrapper(props) {
  const messageRef = useRef(null);
  let typeWritterInstance = null;

  const _onMessagesChunk = (messages) => {
    const _messages = messages
      .filter(m => m.samurai !== undefined)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(m => m.title || m.message);
  
    const lastMessage = messages.slice(-1)[0];
    console.log('Last sequence message was: ', lastMessage);
    console.log('Triggering input as: ', getInputData(lastMessage));
    
    if (typeWritterInstance) {
      typeWritterInstance.destroy();
    }
  
    typeWritterInstance = new Typed(messageRef.current, {
      strings: [_messages.join('^750\n')],
      contentType: 'null', // 'html'
      typeSpeed: 50,
      showCursor: false,
      onComplete: () => {
        $inputRenderer.next(
          getInputData(lastMessage)
        );
      },
    });
  };

  useEffect(() => {
    // On mount listeners.
    const bufferSubscription = $bufferedReceptor.subscribe(_onMessagesChunk);
    const chunkSubscription = $chunkReceptor.subscribe(_onMessagesChunk);

    return () => {
      bufferSubscription.unsubscribe();
      chunkSubscription.unsubscribe();
    };
  }, []);

  return (
    <Message messageRef={messageRef} />
  );
}
