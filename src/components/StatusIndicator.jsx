import PropTypes from "prop-types";
export const StatusIndicator = ({ status }) => {
  const emoji = status === "Alive" ? "🟢" : status === "Dead" ? "🔴" : "⚪";
  return <>{emoji}</>;
};

StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired,
};
