import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLists } from '../../modules/list';
import ListsContainer from './ListsContainer';

const mapStateToProps = ({ list }) => ({
  fetching: list.fetching,
  lists: list.lists
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLists
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
