import { Pagination } from "@/components/Pagination.jsx";
import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const Locations = ({ url }) => {
  const [location, setLocation] = useState([]);
  const [locationPageInfo, setLocationPageInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fecthCharacters = async (page) => {
      try {
        const locationsData = await fetchData(`${url}/location?page=${page}`);
        setLocation(locationsData.results);
        setLocationPageInfo(locationsData.info);
      } catch (e) {
        console.error("error al consumir la API", e);
      }
    };
    fecthCharacters(currentPage);
  }, [url, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <Pagination
        page={currentPage}
        next={locationPageInfo.next}
        prev={locationPageInfo.prev}
        onPageChange={handlePageChange}
      />
      <section>
        {location.map((locations) => (
          <div key={locations.id}>
            <h2>{locations.name}</h2>
            <span>{locations.type}</span>
            <strong>{locations.dimension}</strong>
          </div>
        ))}
      </section>
    </>
  );
};

Locations.propTypes = {
  url: PropTypes.string.isRequired,
};
