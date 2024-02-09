import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    </>
  );
};

CharacterDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
