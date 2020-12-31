import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function FilterBar({ updateFilter }) {
  const [activeFilter, setFilter] = useState('All');

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      text={name}
      setFilter={() => {
        setFilter(name);
        updateFilter(name);
      }}
      isPressed={name === activeFilter}
    />
  ));

  return <div className="filters btn-group stack-exception">{filterList}</div>;
}

FilterBar.propTypes = {
  updateFilter: PropTypes.func.isRequired,
};
