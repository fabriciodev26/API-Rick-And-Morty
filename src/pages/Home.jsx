import { SearchComponent } from "@/components/SearchComponent";
import PropTypes from "prop-types";
export const Home = ({ url }) => {
  return <SearchComponent url={url} />;
};

Home.propTypes = {
  url: PropTypes.string.isRequired,
};
