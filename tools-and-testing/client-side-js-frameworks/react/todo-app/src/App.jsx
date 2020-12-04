import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form';
import TaskTable from './components/TaskTable';

function App({ tasks }) {
  const [currentTasks, setTasks] = useState(tasks);

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

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks((storedTasks) => [...storedTasks, newTask]);
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <TaskTable
        tasks={currentTasks}
        toggleCompleted={toggleTaskCompleted}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
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
