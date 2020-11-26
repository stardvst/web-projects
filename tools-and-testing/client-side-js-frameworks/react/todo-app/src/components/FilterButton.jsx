import PropTypes from 'prop-types';

export default function FilterButton({ text, ariaPressed = false }) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed={ariaPressed}>
      <span className="visually-hidden">Show </span>
      <span>{text}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  ariaPressed: PropTypes.bool,
};
