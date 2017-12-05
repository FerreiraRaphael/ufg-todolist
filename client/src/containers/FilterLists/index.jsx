import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  filterByAll,
  filterByArchived,
  filterByUnarchived
} from '../../modules/list';
import FilterLists from './FilterLists';

const mapStateToProps = ({ list: { filter } }) => ({
  filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      filterByAll,
      filterByArchived,
      filterByUnarchived
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FilterLists);
