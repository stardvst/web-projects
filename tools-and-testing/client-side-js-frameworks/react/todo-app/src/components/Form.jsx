/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { addTask } = this.props;
    if (name === '') return;
    addTask(name);
    this.setState({ name: '' });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addTask: PropTypes.func,
};

export default Form;
