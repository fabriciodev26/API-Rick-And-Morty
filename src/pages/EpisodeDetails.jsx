import { fetchData } from "@/fetchData.js";
import { getIdURL } from "@/getIdUrl";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      {console.log(episodeDetails)}
      <h2>{episodeDetails.name}</h2>
      <p>{episodeDetails.air_date}</p>
      <p>{episodeDetails.created}</p>
      <p>{episodeDetails.episode}</p>
      <p>{episodeDetails.air_date}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Characters</th>
          </tr>
        </thead>
        <tbody>
          {episodeDetails.characters.map((character, characterId) => (
            <tr key={characterId}>
              <th scope="row">{characterId}</th>
              <td>
                <Link to={`/characters/${getIdURL(character)}`}>
                  {character}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

EpisodeDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
