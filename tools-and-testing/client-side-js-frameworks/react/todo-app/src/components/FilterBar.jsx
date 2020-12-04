import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: 'All',
    };
  }

  updateFilter = (filterName) => {
    this.setState({ activeFilter: filterName });
  };

  render() {
    const { activeFilter } = this.state;
    const { updateFilter } = this.props;
    const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
        key={name}
        text={name}
        setFilter={() => { this.updateFilter(name); updateFilter(name); }}
        isPressed={name === activeFilter}
      />
    ));

    return (
      <div className="filters btn-group stack-exception">{filterList}</div>
    );
  }
}

FilterBar.propTypes = {
  updateFilter: PropTypes.func.isRequired,
};

export default FilterBar;
