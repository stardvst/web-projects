import { React } from 'react';
import PropTypes from 'prop-types';

export default function Todo({
  name, id, toggleCompleted, completed = false,
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
        <button type="button" className="btn">
          Edit
          {' '}
          <span className="visually-hidden">Eat</span>
        </button>
        <button type="button" className="btn btn__danger">
          Delete
          {' '}
          <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </li>
  );
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
};
