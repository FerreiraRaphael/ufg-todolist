import React from 'react';
import PropTypes from 'prop-types';
import './LeftSideBar.css';

const LeftSideBar = ({ children }) => (
  <div className="LeftSideBar-container rounded-left">{children}</div>
);

LeftSideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default LeftSideBar;
