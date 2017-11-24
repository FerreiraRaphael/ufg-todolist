import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import './MoreOptions.css';

const withClasses = elem =>
  React.cloneElement(elem, {
    className: cs(elem.props.className, 'dropdown-item')
  });

const MoreOptions = ({ children, icon }) => (
  <div className="MoreOptions-container">
    <div className="rounded-circle MoreOptions-menu" data-toggle="dropdown">
      <i className="material-icons">{icon}</i>
    </div>
    <div className="dropdown-menu MoreOptions-dropdown App-shadow">
      {React.Children.map(children, withClasses)}
    </div>
  </div>
);

MoreOptions.defaultProps = {
  icon: 'more_vert'
};

MoreOptions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  icon: PropTypes.string
};

export default MoreOptions;
