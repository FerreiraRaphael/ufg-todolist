import React from 'react';
import PropTypes from 'prop-types';
import Activities from '../../components/Activities';

class ActivitiesContainer extends React.Component {
  componentDidMount() {
    const { listId, fetchActivities } = this.props;
    if (listId) fetchActivities(listId);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.listId && newProps.listId !== this.props.listId) {
      this.props.fetchActivities(newProps.listId);
    }
  }
  render() {
    const { activities } = this.props;
    return <Activities activities={activities} />;
  }
}

ActivitiesContainer.propTypes = {
  listId: PropTypes.number.isRequired,
  fetchActivities: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string
    })
  ).isRequired
};

export default ActivitiesContainer;
