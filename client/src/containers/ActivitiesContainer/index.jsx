import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActivitiesContainer from './ActivitiesContainer';
import { fetchActivities } from '../../modules/activity';

const mapStateToProps = ({ list, activity }) => ({
  listId: list.selectedList ? list.selectedList.id : 0,
  activities: activity.activities
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchActivities
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivitiesContainer
);
