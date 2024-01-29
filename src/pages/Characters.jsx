import { Pagination } from "@/components/Pagination.jsx";
import { fetchData } from "@/fetchData.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
      <section>
        {character.map((char) => (
          <div key={char.id}>
            <h2>{char.name}</h2>
            <img src={char.image} alt={char.name} />
            <span>{char.gender}</span>
          </div>
        ))}
      </section>
    </>
  );
};

Characters.propTypes = {
  url: PropTypes.string.isRequired,
};
