import React from 'react';
import PropTypes from 'prop-types';
import './AppMainHeader.css';

const AppMainHeader = ({ label, onLeftControlClick, onRightControlClick }) => (
  <div className="AppMainHeader-container">
    <div
      onClick={() => onLeftControlClick()}
      role="button"
      tabIndex={0}
      onKeyPress={event => {
        if (event.key === 13) onLeftControlClick();
      }}
      className="AppMainHeader-controls hidden-sm-up"
    >
      <a className="material-icons">list</a>
    </div>
    <div className="AppMainHeader-label">
      <span>{label}</span>
    </div>
    <div
      onClick={() => onRightControlClick()}
      role="button"
      tabIndex={0}
      onKeyPress={event => {
        if (event.key === 13) onRightControlClick();
      }}
      className="AppMainHeader-controls"
    >
      <a className="material-icons">info</a>
    </div>
  </div>
);

AppMainHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onLeftControlClick: PropTypes.func.isRequired,
  onRightControlClick: PropTypes.func.isRequired
};

export default AppMainHeader;
