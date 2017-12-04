import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './AppMain.css';

const AppMain = ({ children }) => <div className="AppMain-container rounded-right">{children}</div>;

AppMain.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default withRouter(AppMain);
