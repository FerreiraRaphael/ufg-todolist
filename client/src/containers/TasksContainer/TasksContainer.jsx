import React from 'react';
import PropTypes from 'prop-types';
import { Tasks } from '../../components/Tasks';
import { taskSchema, listSchema } from '../../schemas';
import { filters } from '../../lib/helpers';

class TasksContainer extends React.Component {
  async componentDidMount() {
    this.props.selectList(this.props.match.params.listId);
    await this.props.fetchTasks(this.props.match.params.listId);
  }

  async componentWillReceiveProps(nextProps) {
    const { listId } = nextProps.match.params;
    const selectedId = nextProps.selectedList.id
      ? nextProps.selectedList.id
      : '';

    // When the listId url param changes, fetch the task for that list
    if (this.props.match.params.listId !== listId) {
      this.props.selectList(listId);
      this.props.fetchTasks(listId);
    } else if (selectedId && Number(listId) !== selectedId) {
      // When the selectedList changes and it has a diferent id
      // than the listId on the url param, push to than new URL
      this.props.history.push(`/app/list/${selectedId}`);
    }
  }

  render() {
    const { tasks, fetching, deleteTask, editTask, filter } = this.props;
    return (
      <Tasks
        tasks={tasks.filter(filters[filter])}
        loading={fetching}
        onDelete={deleteTask}
        onTaskToggle={editTask}
        onArchiveClick={editTask}
        onDatePick={editTask}
      />
    );
  }
}

TasksContainer.defaultProps = {
  fetching: false,
  selectedList: {
    id: 0,
    title: ''
  }
};

TasksContainer.propTypes = {
  fetching: PropTypes.bool,
  fetchTasks: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  selectedList: PropTypes.shape(listSchema),
  tasks: PropTypes.arrayOf(PropTypes.shape(taskSchema)).isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default TasksContainer;
