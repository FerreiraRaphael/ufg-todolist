import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import { Circle } from 'rc-progress';
import { listSchema } from '../../../schemas';
import MoreOptions from '../../MoreOptions';
import './ListItem.css';

const ListItem = ({ title, id, selected }) => (
  <li className={cs('ListItem-container', selected)}>
    <div className="ListItem-task-progress">
      <Circle percent="59" strokeWidth="10" strokeColor="#2196F3" />
      <div className="ListItem-task-number">+99</div>
    </div>
    <div className="ListItem-title ellipsify">
      <Link to={`/list/${id}`}>{title}</Link>
    </div>
    <div className="ListItem-controls">
      <MoreOptions icon="keyboard_arrow_down">
        <a>Editar</a>
        <a>Deletar</a>
      </MoreOptions>
    </div>
  </li>
);

ListItem.defaultProps = {
  selected: false
};

ListItem.propTypes = { ...listSchema, selected: PropTypes.bool };

export default ListItem;
