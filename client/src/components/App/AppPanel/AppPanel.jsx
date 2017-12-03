import React from 'react';
import PropTypes from 'prop-types';
import './AppPanel.css';

const AppPanel = ({ children }) => <div className="App-panel App-shadow">{children}</div>;

AppPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default AppPanel;
