import { fetchData } from "@/fetchData.js";
import { getIdURL } from "@/getIdUrl";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StatusIndicator } from "../components/StatusIndicator";
export const CharacterDetails = ({ url }) => {
  const { characterId } = useParams();
  const [CharacterDetails, setCharacterDetails] = useState(null);
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterData = await fetchData(
          `${url}/character/${characterId}`
        );
        setCharacterDetails(characterData);
      } catch (e) {
        console.error(
          "Error al consumir la API para los detalles de los personajes",
          e
        );
      }
    };

    fetchCharacterDetails();
  }, [url, characterId]);

  if (!CharacterDetails) {
    return <p>Cargando los detalles del personaje...</p>;
  }
  return (
    <>
      <h2>{CharacterDetails.name}</h2>
      <img src={CharacterDetails.image} alt={CharacterDetails.name} />
      <span>
        <StatusIndicator status={CharacterDetails.status} />
        {CharacterDetails.status} - {CharacterDetails.species} -
        {CharacterDetails.gender}
      </span>
      <span className="origin-link">
        Origen:
        <Link to={`/locations/${CharacterDetails.id}`}>
          {CharacterDetails.origin.name}
        </Link>
      </span>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          {CharacterDetails.episode.map((episode, episodeID) => (
            <tr key={episodeID}>
              <th scope="row">{episodeID}</th>
              <td>
                <Link to={`/episodes/${getIdURL(episode)}`}>{episode}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

CharacterDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
