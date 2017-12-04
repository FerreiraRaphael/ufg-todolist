import React from 'react';
import PropTypes from 'prop-types';
import './ActivityItem.css';

const ActivityItem = ({ description }) => (
  <li className="ActivityItem-container">
    <div className="ActivityItem-label">{description}</div>
  </li>
);

ActivityItem.propTypes = {
  description: PropTypes.string.isRequired
};

export default ActivityItem;
