import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { taskSchema } from '../../../schemas';
import MoreOptions from '../../MoreOptions';
import TaskItemInput from './TaskItemInput';
import './TaskItem.css';

const TaskItem = ({ id, title, done, onEdit, onDelete, onTaskToggle }) => (
  <li className={cs('TaskItem-container')}>
    <TaskItemInput
      done={done}
      onChange={checked => {
        onTaskToggle({ id, title, done: checked });
      }}
    />
    <div className="TaskItem-title ellipsify">
      <span>{title}</span>
    </div>
    <div className="TaskItem-controls">
      <MoreOptions icon="keyboard_arrow_down">
        <a
          role="button"
          onClick={() => onEdit(id)}
          tabIndex={0}
          onKeyPress={event => {
            if (event.key === 'Enter') onEdit(id);
          }}
        >
          Editar
        </a>
        <a
          role="button"
          onClick={() => onDelete(id)}
          tabIndex={0}
          onKeyPress={event => {
            if (event.key === 'Enter') onDelete(id);
          }}
        >
          Deletar
        </a>
      </MoreOptions>
    </div>
  </li>
);

TaskItem.defaultProps = {
  selected: false
};

TaskItem.propTypes = {
  ...taskSchema,
  selected: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onTaskToggle: PropTypes.func.isRequired
};

export default TaskItem;
