import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { fetchLists, deleteList } from '../../modules/list';
import ListsContainer from './ListsContainer';

const mapStateToProps = ({ list: { fetching, lists, selectedList } }) => ({
  fetching,
  lists,
  selectedList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLists,
      deleteList
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListsContainer)
);
