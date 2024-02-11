import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const SearchComponent = ({ url }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("characters");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      let apiUrl;
      switch (searchType) {
        case "characters":
          apiUrl = `${url}/character/?name=${search}`;
          break;
        case "episodes":
          apiUrl = `${url}/episode/?name=${search}`;
          break;
        case "locations":
          apiUrl = `${url}/location/?name=${search}`;
          break;
        default:
          console.log("tipo de busqueda no valido");
          return;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();

      setSearchResults(data.results || []);
    } catch (e) {
      console.log("Error al realizar la busqueda", e);
      setSearchResults([]); // Limpiar los resultados en caso de error
    }
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  // Verificar si al menos un resultado tiene imagen
  const hasImage = searchResults.some((result) => result.image);

  return (
    <>
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Buscar..."
        />
        <select
          className="select-item"
          value={searchType}
          onChange={handleTypeChange}
        >
          <option value="characters">Personajes</option>
          <option value="locations">Locaciones</option>
          <option value="episodes">Episodios</option>
        </select>
      </form>
      {searchResults.length > 0 && (
        <section className="view-data">
          <table className="table">
            <thead className="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                {hasImage && <th scope="col">Imagen</th>}
                <th scope="col">Enlace</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {searchResults.map((result) => (
                <tr key={result.id}>
                  <th>{result.id}</th>
                  <th>{result.name}</th>
                  {hasImage && (
                    <th>
                      {result.image ? (
                        <img src={result.image} alt={result.name} />
                      ) : (
                        "N/A"
                      )}
                    </th>
                  )}
                  <th>
                    <NavLink to={`${searchType}/${result.id}`}>Ver Más</NavLink>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

SearchComponent.propTypes = {
  url: PropTypes.string.isRequired,
};
