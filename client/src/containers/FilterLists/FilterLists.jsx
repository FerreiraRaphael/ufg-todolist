import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../../components/Filter';

function transformFilterToString(filter) {
  const filters = {
    ALL: 'Todas as Listas',
    UNARCHIVED: 'Listas não arquivadas',
    ARCHIVED: 'Listas arquivadas'
  };
  return filters[filter];
}

const FilterLists = ({
  filter,
  filterByAll,
  filterByArchived,
  filterByUnarchived
}) => (
  <Filter
    label={transformFilterToString(filter)}
    filters={[
      { label: transformFilterToString('ALL'), onClick: filterByAll },
      {
        label: transformFilterToString('UNARCHIVED'),
        onClick: filterByUnarchived
      },
      { label: transformFilterToString('ARCHIVED'), onClick: filterByArchived }
    ]}
  />
);

FilterLists.propTypes = {
  filter: PropTypes.string.isRequired,
  filterByAll: PropTypes.func.isRequired,
  filterByArchived: PropTypes.func.isRequired,
  filterByUnarchived: PropTypes.func.isRequired
};

export default FilterLists;
