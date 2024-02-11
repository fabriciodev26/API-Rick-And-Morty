import { Pagination } from "@/components/Pagination.jsx";
import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StatusIndicator } from "../components/StatusIndicator";

export const Characters = ({ url }) => {
  const [character, setCharacter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [characterPageInfo, setCharacterPageInfo] = useState([]);

  useEffect(() => {
    const fetchCharacters = async (page) => {
      try {
        const charactersData = await fetchData(`${url}/character?page=${page}`);
        setCharacter(charactersData.results);
        setCharacterPageInfo(charactersData.info);
      } catch (e) {
        console.error("Error al consumir la API", e);
      }
    };

    fetchCharacters(currentPage);
  }, [url, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Pagination
        page={currentPage}
        next={characterPageInfo.next}
        prev={characterPageInfo.prev}
        onPageChange={handlePageChange}
      />
      <section className="list-characters">
        {character.map((char) => (
          <article className="item-character" key={char.id}>
            <img src={char.image} alt={char.name} />
            <h2>{char.name}</h2>
            <div className="container">
              <span>
                <StatusIndicator status={char.status} />
                {char.status} - {char.species}
              </span>
              <span>Genero: {char.gender}</span>
              <span className="origin-link">
                Origen:
                <Link to={`/locations/${char.id}`}>{char.origin.name}</Link>
              </span>
            </div>
            <Link to={`${char.id}`}>Ver Mas</Link>
          </article>
        ))}
      </section>
      <Pagination
        page={currentPage}
        next={characterPageInfo.next}
        prev={characterPageInfo.prev}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Characters.propTypes = {
  url: PropTypes.string.isRequired,
};
