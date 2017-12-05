import React from 'react';
import PropTypes from 'prop-types';
import MoreOptions from '../MoreOptions';
import { filterSchema } from '../../schemas';
import './Filter.css';

const Filter = ({ label, filters }) => (
  <div className="Filter-container">
    <div className="Filter-controls">
      <MoreOptions icon="filter_list">
        {filters.map(filter => (
          <span
            key={filter.label}
            onClick={filter.onClick}
            role="link"
            tabIndex={-1}
            onKeyPress={e => {
              if (e.key === 13) filter.onClick();
            }}
          >
            {filter.label}
          </span>
        ))}
      </MoreOptions>
    </div>
    <div className="Filter-label">{label}</div>
  </div>
);

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(filterSchema).isRequired
};

export default Filter;
