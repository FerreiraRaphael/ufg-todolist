import React from 'react';
import PropTypes from 'prop-types';
import './AppMainHeader.css';

const AppMainHeader = ({
  label,
  onLeftControlClick,
  onRightControlClick,
  showInfoControls
}) => (
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
    {showInfoControls ? (
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
    ) : (
      <div />
    )}
  </div>
);

AppMainHeader.defaultProps = {
  showInfoControls: true
}

AppMainHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onLeftControlClick: PropTypes.func.isRequired,
  onRightControlClick: PropTypes.func.isRequired,
  showInfoControls: PropTypes.bool
};

export default AppMainHeader;
