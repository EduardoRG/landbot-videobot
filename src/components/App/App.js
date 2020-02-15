// system
import React from 'react';

// lib

// components

export default function App(props) {
  return (
    <section id="App" className="hero is-fullheight">
      <div
        className="has-text-centered"
        style={{ height: '100%' }}
      >
        {props.children}
      </div>
    </section>
  );
}
