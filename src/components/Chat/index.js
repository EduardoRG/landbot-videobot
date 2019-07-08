// system
import React, { useState } from 'react';

// lib

// components
import Chat from './Chat';
import Messages from 'components/Messages';
import Input from 'components/Input';
import Loader from 'components/Loader';

export default function ChatWrapper(props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Chat
      isLoading={isLoading}
      loader={<Loader />}
      messages={<Messages setIsLoading={setIsLoading} />}
      input={<Input />}
    />
  );
}
