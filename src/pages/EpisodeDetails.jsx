import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const EpisodeDetails = ({ url }) => {
  const { episodeId } = useParams();
  const [episodeDetails, setEpisodeDetails] = useState(null);
  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const episodeData = await fetchData(`${url}/episode/${episodeId}`);
        setEpisodeDetails(episodeData);
      } catch (e) {
        console.error(
          "Error al consumir la API para los detalles de los personajes",
          e
        );
      }
    };

    fetchEpisodeDetails();
  }, [url, episodeId]);

  if (!episodeDetails) {
    return <p>Cargando los detalles del personaje...</p>;
  }
  return (
    <>
      <h2>{episodeDetails.name}</h2>
    </>
  );
};

EpisodeDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
