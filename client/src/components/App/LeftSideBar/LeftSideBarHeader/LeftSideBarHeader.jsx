import React from 'react';
import PropTypes from 'prop-types';
import MoreOptions from '../../../MoreOptions';
import './LeftSideBarHeader.css';

const LeftSideBarHeader = ({ username }) => (
  <div className="LeftSideBarHeader-container">
    <div className="LeftSideBarHeader-username">
      <span>{username}</span>
    </div>
    <div className="LeftSideBarHeader-controls">
      {/* <div
        className="rounded-circle LeftSideBarHeader-more-menu"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="material-icons">more_vert</i>
      </div>
      <div
        className="dropdown-menu LeftSideBarHeader-dropdown App-shadow"
        aria-labelledby="btnGroupDrop1"
        x-placement="bottom-start"
      >
        <a className="dropdown-item" href="#">
          Sobre
        </a>
        <a className="dropdown-item" href="#">
          Sair
        </a>
      </div> */}
      <MoreOptions>
        <span>
          Sobre
        </span>
        <span>
          Sair
        </span>
      </MoreOptions>
    </div>
  </div>
);

LeftSideBarHeader.propTypes = {
  username: PropTypes.string.isRequired
};

export default LeftSideBarHeader;
