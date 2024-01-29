import { Pagination } from "@/components/Pagination.jsx";
import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const Episodes = ({ url }) => {
  const [episode, setEpisode] = useState([]);
  const [episodePageInfo, setEpisodePageInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fecthEpisodes = async (page) => {
      try {
        const episodesData = await fetchData(`${url}/episode?page=${page}`);
        setEpisode(episodesData.results);
        setEpisodePageInfo(episodesData.info);
      } catch (e) {
        console.error("error al consumir la API", e);
      }
    };
    fecthEpisodes(currentPage);
  }, [url, currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <Pagination
        page={currentPage}
        next={episodePageInfo.next}
        prev={episodePageInfo.prev}
        onPageChange={handlePageChange}
      />
      <section>
        {episode.map((episodes) => (
          <div key={episodes.id}>
            <h2>{episodes.name}</h2>
            <strong>{episodes.episode}</strong>
            <span>{episodes.air_date}</span>
          </div>
        ))}
      </section>
    </>
  );
};

Episodes.propTypes = {
  url: PropTypes.string.isRequired,
};
