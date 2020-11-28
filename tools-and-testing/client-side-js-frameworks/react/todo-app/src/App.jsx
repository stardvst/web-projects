import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ tasks }) {
  const [currentTasks, setTasks] = useState(tasks);
  const [filter, setFilter] = useState('All');

  const toggleTaskCompleted = (id) => {
    const updatedTasks = [...currentTasks];
    const toggledTask = updatedTasks.find((task) => task.id === id);
    toggledTask.completed = !toggledTask.completed;
    setTasks(updatedTasks);
  };

  const deleteTodo = (id) => {
    setTasks(currentTasks.filter((task) => task.id !== id));
  };

  const editTodo = (id, newName) => {
    const updatedTasks = [...currentTasks];
    const changedTask = updatedTasks.find((task) => task.id === id);
    changedTask.name = newName;
    setTasks(updatedTasks);
  };

  const updateFilter = (filterName) => {
    setFilter(filterName);
  };

  const taskList = currentTasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleCompleted={toggleTaskCompleted}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      text={name}
      setFilter={updateFilter}
      isPressed={name === filter}
    />
  ));

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks((storedTasks) => [...storedTasks, newTask]);
  };

  const tasksNoun = taskList.length === 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

App.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
};

export default App;
