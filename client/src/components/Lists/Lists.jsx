import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { listSchema } from '../../schemas';
import './Lists.css';

const Lists = ({ lists, selectedList, onDelete, onEdit }) => (
  <div className="Lists-container">
    <ul>
      {lists.map(list => (
        <ListItem
          key={list.id}
          {...list}
          selected={selectedList && selectedList.id === list.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  </div>
);

Lists.defaultProps = {
  selectedList: {
    id: 0,
    title: ''
  }
};

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape(listSchema)).isRequired,
  selectedList: PropTypes.shape(listSchema),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Lists;
