import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import './RightSideBar.css';

const RightSideBar = ({ children, open }) => (
  <div
    className={cs(
      { 'RightSideBar-open': open },
      'RightSideBar-container',
      'rounded-right'
    )}
  >
    {children}
  </div>
);

RightSideBar.defaultProps = {
  open: false
};

RightSideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  open: PropTypes.bool
};

export default RightSideBar;
