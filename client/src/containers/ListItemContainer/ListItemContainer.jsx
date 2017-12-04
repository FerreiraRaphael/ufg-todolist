import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../components/Lists/ListItem';
import { listSchema } from '../../schemas';

const ListItemContainer = ({
  id,
  title,
  selected,
  onDelete,
  editList,
  history,
  collapseLeftSideBar
}) => (
  <ListItem
    id={id}
    title={title}
    selected={selected}
    onDelete={onDelete}
    editList={editList}
    onClick={() => {
      collapseLeftSideBar();
      history.push(`/app/list/${id}`);
    }}
  />
);

ListItemContainer.defaultProps = {
  selected: false
};

ListItemContainer.propTypes = {
  ...listSchema,
  selected: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  collapseLeftSideBar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func.isRequired
};

export default ListItemContainer;
