import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Circle } from 'rc-progress';
import { listSchema } from '../../../schemas';
import MoreOptions from '../../MoreOptions';
import './ListItem.css';

const ListItem = ({ title, id, selected, onEdit, onDelete, onClick }) => (
  <li className={cs('ListItem-container', { selected })}>
    <div className="ListItem-task-progress">
      <Circle percent="59" strokeWidth="10" strokeColor="#2196F3" />
      <div className="ListItem-task-number">+99</div>
    </div>
    <div
      onClick={() => onClick()}
      role="link"
      tabIndex={0}
      onKeyPress={event => {
        if (event.key === 13) {
          onClick();
        }
      }}
      className="ListItem-title ellipsify"
    >
      {title}
    </div>
    <div className="ListItem-controls">
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

ListItem.defaultProps = {
  selected: false
};

ListItem.propTypes = {
  ...listSchema,
  selected: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ListItem;
