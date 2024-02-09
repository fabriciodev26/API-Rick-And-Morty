import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export const SearchComponent = ({ url }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("characters");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch();
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
    handleSearch();
  };

  const handleSearch = async () => {
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

      switch (searchType) {
        case "characters":
          setSearchResults(data.results);
          break;
        case "episodes":
          setSearchResults(data.results);
          break;
        case "locations":
          setSearchResults(data.results);
          break;
        default:
          console.log("tipo de busqueda no valido");
          return;
      }
    } catch (e) {
      console.log("Error al realizar la busqueda", e);
    }
  };

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
      <section className="view-data">
        <table className="table">
          <thead className="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Imagen</th>
              <th scope="col">Enlace</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {searchResults?.map((result) => (
              <tr key={result.id}>
                <th>{result.id}</th>
                <th>{result.name}</th>
                <th>
                  <img src={result.image} alt={result.name} />
                </th>
                <th>
                  <NavLink to={`${searchType}/${result.id}`}> Ver Mas</NavLink>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

SearchComponent.propTypes = {
  url: PropTypes.string.isRequired,
};
