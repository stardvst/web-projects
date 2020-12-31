import PropTypes from 'prop-types';
import { useRef } from 'react';
import Todo from './Todo';

export default function TaskList({
  tasks,
  toggleCompleted,
  editTask,
  deleteTask,
}) {
  const headingRef = useRef(null);

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleCompleted={toggleCompleted}
      editTask={editTask}
      deleteTask={(...args) => {
        deleteTask(...args);
        headingRef.current.focus();
      }}
    />
  ));

  const tasksNoun = taskList.length === 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <>
      <h2 id="list-heading" tabIndex="-1" ref={headingRef}>
        {headingText}
      </h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
