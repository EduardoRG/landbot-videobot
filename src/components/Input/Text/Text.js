// system
import React from 'react';
import PropTypes from 'prop-types';

// lib

// components

export default function Text(props) {
  return (
    <div className="InputText">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="InputText__input input is-size-5"
            onChange={(e) => props.onChange(e.target.value)}
            onKeyDown={props.onKeyDown}
            placeholder="Type here..."
            ref={props.inputRef}
            value={props.value}
            type="text"
            required
          />
        </div>
        <div className="control">
          <button className="InputText__submit button is-size-5" type="submit">
            <span className="icon">
              <i className="fas fa-paper-plane"></i>
            </span>
          </button>
        </div>
      </div>
      <div className="InputText__line"></div>
    </div>
  );
}

Text.propTypes = {
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
};

Text.defaultProps = {
  inputRef: null,
  onChange: () => {},
  onKeyDown: () => {},
  value: '',
};
