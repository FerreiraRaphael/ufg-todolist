import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';
import { listSchema } from '../../schemas';
import './Lists.css';

const Lists = ({ lists }) => (
  <div className="Lists-container">
    <ul>{lists.map(list => <ListItem key={list.id} {...list} />)}</ul>
  </div>
);

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape(listSchema)).isRequired
};

export default Lists;
