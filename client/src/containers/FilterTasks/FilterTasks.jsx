import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../../components/Filter';

function transformFilterToString(filter) {
  const filters = {
    ALL: 'Todas as Tarefas',
    UNARCHIVED: 'Tarefas não arquivadas',
    ARCHIVED: 'Tarefas arquivadas',
    DONE: 'Tarefas concluídas',
    UNDONE: 'Tarefas não concluídas'
  };
  return filters[filter];
}

const FilterTasks = ({
  filter,
  filterByAll,
  filterByArchived,
  filterByDone,
  filterByUnarchived,
  filterByUndone
}) => (
  <Filter
    label={transformFilterToString(filter)}
    filters={[
      { label: transformFilterToString('ALL'), onClick: filterByAll },
      {
        label: transformFilterToString('UNARCHIVED'),
        onClick: filterByUnarchived
      },
      { label: transformFilterToString('ARCHIVED'), onClick: filterByArchived },
      { label: transformFilterToString('DONE'), onClick: filterByDone },
      { label: transformFilterToString('UNDONE'), onClick: filterByUndone }
    ]}
  />
);

FilterTasks.propTypes = {
  filter: PropTypes.string.isRequired,
  filterByAll: PropTypes.func.isRequired,
  filterByArchived: PropTypes.func.isRequired,
  filterByUnarchived: PropTypes.func.isRequired,
  filterByDone: PropTypes.func.isRequired,
  filterByUndone: PropTypes.func.isRequired
};

export default FilterTasks;
