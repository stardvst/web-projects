import PropTypes from 'prop-types';
import React from 'react';
import TaskList from './TaskList';
import FilterBar, { FILTER_MAP } from './FilterBar';

class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
    };
  }

  updateFilter = (newFilter) => {
    this.setState({ filter: newFilter });
  };

  render() {
    const { filter } = this.state;
    const {
      tasks, toggleCompleted, editTodo, deleteTodo,
    } = this.props;

    const filteredTasks = tasks.filter(FILTER_MAP[filter]);

    return (
      <div>
        <FilterBar filter={filter} updateFilter={this.updateFilter} />
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          toggleCompleted={toggleCompleted}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    );
  }
}

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TaskTable;
