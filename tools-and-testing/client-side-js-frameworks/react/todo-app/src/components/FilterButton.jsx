import PropTypes from 'prop-types';

export default function FilterButton({ text, setFilter, isPressed = false }) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(text)}
    >
      <span className="visually-hidden">Show </span>
      <span>{text}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  isPressed: PropTypes.bool,
};
