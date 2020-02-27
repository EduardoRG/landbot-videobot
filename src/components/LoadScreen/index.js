import React from 'react';

import Loader from 'components/Loader';

export default function LoadScreen(props) {
  return (
    <div className="LoadScreen is-overlay is-flex">
      <Loader />
      <div className="section">
        <p className="uses-color-primary">Loading resources</p>
      </div>
    </div>
  );
}