import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import TaskList from './TaskList';
import FilterBar, { FILTER_MAP } from './FilterBar';
import taskListContext from '../context/TaskList.context';

export default function TaskTable({ toggleCompleted, editTask, deleteTask }) {
  const [filter, setFilter] = useState('All');
  const TaskListContext = useContext(taskListContext);

  return (
    <>
      <FilterBar filter={filter} updateFilter={setFilter} />
      <TaskList
        tasks={TaskListContext.filter(FILTER_MAP[filter])}
        toggleCompleted={toggleCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </>
  );
}

TaskTable.propTypes = {
  toggleCompleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
