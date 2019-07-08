// system
import React from 'react';

// lib

// components

export default class App extends React.Component {
  render() {
    return (
      <section id="App" className="hero is-fullheight">
        <div className="hero-body">
          <div
            className="container has-text-centered"
            style={{ height: '100%' }}
          >
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}
