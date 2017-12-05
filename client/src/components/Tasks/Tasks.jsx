import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import { taskSchema } from '../../schemas';
import './Tasks.css';

const Tasks = ({
  tasks,
  onDelete,
  onTaskToggle,
  onArchiveClick,
  onDatePick
}) => (
  <div className="Tasks-container">
    <ul>
      {tasks.map(task => (
        <TaskItem
          onDelete={onDelete}
          key={task.id}
          {...task}
          onTaskToggle={onTaskToggle}
          onArchiveClick={onArchiveClick}
          onDatePick={date => {
            onDatePick({ id: task.id, finishDate: date.toISOString() });
          }}
        />
      ))}
    </ul>
  </div>
);

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape(taskSchema)).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDatePick: PropTypes.func.isRequired,
  onTaskToggle: PropTypes.func.isRequired
};

export default Tasks;
