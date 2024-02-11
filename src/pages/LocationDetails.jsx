import { fetchData } from "@/fetchData.js";
import { getIdURL } from "@/getIdUrl";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export const LocationDetails = ({ url }) => {
  const { locationId } = useParams();
  const [locationDetails, setlocationDetails] = useState(null);
  useEffect(() => {
    const fetchlocationDetails = async () => {
      try {
        const locationData = await fetchData(`${url}/location/${locationId}`);
        setlocationDetails(locationData);
      } catch (e) {
        console.error(
          "Error al consumir la API para los detalles de los personajes",
          e
        );
      }
    };

    fetchlocationDetails();
  }, [url, locationId]);

  if (!locationDetails) {
    return <p>Cargando los detalles del personaje...</p>;
  }
  return (
    <>
      <h2>{locationDetails.name}</h2>
      <p>{locationDetails.type}</p>
      <p>{locationDetails.dimension}</p>
      <table>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Characters in that dimension</th>
        </tr>
        <tbody>
          {locationDetails.residents.map((character, characterID) => (
            <tr key={characterID}>
              <th scope="row">{characterID}</th>
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

LocationDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
