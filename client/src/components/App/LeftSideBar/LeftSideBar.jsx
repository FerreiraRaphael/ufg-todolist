import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import './LeftSideBar.css';

const LeftSideBar = ({ children, open }) => (
  <div
    className={cs('LeftSideBar-container rounded-left', {
      'LeftSideBar-open': open
    })}
  >
    {children}
  </div>
);

LeftSideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  open: PropTypes.bool.isRequired
};

export default LeftSideBar;
