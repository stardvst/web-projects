import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import usePrevious from '../usePrevious';

function EditTemplate({
  name, id, editTask, setEditing, editFieldRef,
}) {
  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    editTask(id, newName);
    setNewName('');
    setEditing(false);
  };

  return (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for
          {' '}
          {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          name={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">
            renaming
            {' '}
            {name}
          </span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">
            new name for
            {' '}
            {name}
          </span>
        </button>
      </div>
    </form>
  );
}

function ViewTemplate({
  name,
  id,
  toggleCompleted,
  deleteTask,
  completed,
  setEditing,
  editButtonRef,
}) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </li>
  );
}

export default function Todo({
  name,
  id,
  toggleCompleted,
  deleteTask,
  editTask,
  completed = false,
}) {
  const [isEditing, setEditing] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <div className="todo">
      {isEditing ? (
        <EditTemplate
          name={name}
          id={id}
          editTask={editTask}
          setEditing={setEditing}
          editFieldRef={editFieldRef}
        />
      ) : (
        <ViewTemplate
          name={name}
          id={id}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          completed={completed}
          setEditing={setEditing}
          editButtonRef={editButtonRef}
        />
      )}
    </div>
  );
}

EditTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  editTask: PropTypes.func,
  setEditing: PropTypes.func,
  editFieldRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

ViewTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleCompleted: PropTypes.func,
  deleteTask: PropTypes.func,
  completed: PropTypes.bool,
  setEditing: PropTypes.func,
  editButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleCompleted: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  completed: PropTypes.bool,
};
