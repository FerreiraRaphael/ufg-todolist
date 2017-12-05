import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  filterByAll,
  filterByArchived,
  filterByDone,
  filterByUnarchived,
  filterByUndone
} from '../../modules/task';
import FilterTasks from './FilterTasks';

const mapStateToProps = ({ task: { filter } }) => ({
  filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      filterByAll,
      filterByArchived,
      filterByDone,
      filterByUnarchived,
      filterByUndone
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FilterTasks);
