import React from 'react';
import PropTypes from 'prop-types';
import './RightSideBarHeader.css';

const RightSideBarHeader = ({ label, onCloseClick, onUpdateClick }) => (
  <div className="RightSideBarHeader-container">
    <div
      onClick={() => onCloseClick()}
      role="link"
      tabIndex={-1}
      onKeyPress={event => {
        if (event.key === 13) onCloseClick();
      }}
      className="RightSideBarHeader-close"
    >
      <i className="material-icons">close</i>
    </div>
    <div className="RightSideBarHeader-label">{label}</div>
    <div
      onClick={() => onUpdateClick()}
      role="link"
      tabIndex={-1}
      onKeyPress={event => {
        if (event.key === 13) onUpdateClick();
      }}
      className="RightSideBarHeader-update"
    >
      <i className="material-icons">update</i>
    </div>
  </div>
);

RightSideBarHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
};

export default RightSideBarHeader;
