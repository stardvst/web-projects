import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Todo({
  name,
  id,
  toggleCompleted,
  deleteTodo,
  editTodo,
  completed = false,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    editTodo(id, newName);
    setNewName('');
    setEditing(false);
  };

  const editTemplate = (
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

  const viewTemplate = (
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
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTodo(id)}
        >
          Delete
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </li>
  );

  return <div className="todo">{isEditing ? editTemplate : viewTemplate}</div>;
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleCompleted: PropTypes.func,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
  completed: PropTypes.bool,
};
