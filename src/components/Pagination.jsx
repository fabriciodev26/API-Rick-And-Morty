import PropTypes from "prop-types";

export const Pagination = ({ page, next, prev, onPageChange }) => {
  const handleButtonNext = (e) => {
    e.preventDefault();
    if (next != null) {
      onPageChange(page + 1);
    }
  };
  const handleButtonPrev = (e) => {
    e.preventDefault();
    if (prev != null) {
      onPageChange(page - 1);
    }
  };
  return (
    <div className="paginationButton">
      <button className="paginationButton__next btn" onClick={handleButtonPrev}>
        Prev
      </button>
      <button className="paginationButton__prev btn" onClick={handleButtonNext}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  next: PropTypes.string,
  prev: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
};
