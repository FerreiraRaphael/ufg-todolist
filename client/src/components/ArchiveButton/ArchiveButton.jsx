import React from 'react';
import PropTypes from 'prop-types';
import './ArchiveButton.css';

const ArchiveButton = ({ archived, onClick }) => (
  <div
    onClick={() => {
      onClick();
    }}
    onKeyPress={event => {
      if (event.key === 13) onClick();
    }}
    role="button"
    tabIndex={-1}
    className="ArchiveButton-container"
  >
    <i className="material-icons">{archived ? 'unarchive' : 'archive'}</i>
  </div>
);

ArchiveButton.propTypes = {
  archived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ArchiveButton;
