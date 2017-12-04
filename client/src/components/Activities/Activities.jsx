import React from 'react';
import PropTypes from 'prop-types';
import ActivityItem from './ActivityItem/ActivityItem';
import './Activities.css';

const Activities = ({ activities }) => (
  <div className="Activities-container">
    <ul>
      {activities.map(activity => (
        <ActivityItem key={activity.id} description={activity.description} />
      ))}
    </ul>
  </div>
);

Activities.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string
    })
  ).isRequired
};

export default Activities;
