import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTasks, deleteTask, editTask } from '../../modules/task';
import { collapseLeftSideBar } from '../../modules/app';
import { selectList } from '../../modules/list';
import TasksContainer from './TasksContainer';

const mapStateToProps = ({ task, list }) => ({
  fetching: task.fetching,
  tasks: task.tasks,
  selectedList: list.selectedList,
  filter: task.filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTasks,
      selectList,
      deleteTask,
      editTask,
      collapseLeftSideBar
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
