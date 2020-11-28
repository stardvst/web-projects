import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App({ tasks }) {
  const [currentTasks, setTasks] = useState(tasks);

  const toggleTaskCompleted = (id) => {
    const toggledTask = currentTasks.filter((task) => task.id === id);
    toggledTask.completed = !toggledTask.completed;
    setTasks(currentTasks);
  };

  const deleteTodo = (id) => {
    setTasks(currentTasks.filter((task) => task.id !== id));
  };

  const taskList = currentTasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleCompleted={toggleTaskCompleted}
      deleteTodo={deleteTodo}
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
      <Form addTask={addTask} deleteTodo={deleteTodo} />
      <div className="filters btn-group stack-exception">
        <FilterButton text="all" ariaPressed />
        <FilterButton text="Active" />
        <FilterButton text="Completed" />
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
