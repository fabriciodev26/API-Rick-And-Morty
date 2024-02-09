import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    </>
  );
};

LocationDetails.propTypes = {
  url: PropTypes.string.isRequired,
};
