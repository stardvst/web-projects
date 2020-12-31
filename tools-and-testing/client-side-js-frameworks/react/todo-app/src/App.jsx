import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form';
import TaskTable from './components/TaskTable';
import TaskListContext from './context/TaskList.context';

export default function App({ initialTasks }) {
  const [currentTasks, setTasks] = useState(initialTasks);

  const toggleTaskCompleted = (id) => {
    setTasks((prevTasks) => {
      const toggledTask = prevTasks.find((task) => task.id === id);
      toggledTask.completed = !toggledTask.completed;
      return [...prevTasks];
    });
  };

  const deleteTask = (id) => {
    setTasks(currentTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newName) => {
    setTasks((prevTasks) => {
      const toggledTask = prevTasks.find((task) => task.id === id);
      toggledTask.name = newName;
      return [...prevTasks];
    });
  };

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks((storedTasks) => [...storedTasks, newTask]);
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <TaskListContext.Provider value={currentTasks}>
        <TaskTable
          toggleCompleted={toggleTaskCompleted}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </TaskListContext.Provider>
    </div>
  );
}

App.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
};
