import React from 'react';
import PropTypes from 'prop-types';
import MoreOptions from '../../../MoreOptions';
import './LeftSideBarHeader.css';

const LeftSideBarHeader = ({ username, onSignOutClick }) => (
  <div className="LeftSideBarHeader-container">
    <div className="LeftSideBarHeader-username">
      <span>{username}</span>
    </div>
    <div className="LeftSideBarHeader-controls">
      <MoreOptions>
        <span
          onClick={() => onSignOutClick()}
          role="link"
          tabIndex={-1}
          onKeyPress={e => {
            if (e.key === 13) onSignOutClick();
          }}
        >
          Sair
        </span>
      </MoreOptions>
    </div>
  </div>
);

LeftSideBarHeader.propTypes = {
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default LeftSideBarHeader;
