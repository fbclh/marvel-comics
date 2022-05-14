import { useState } from 'react';
import { Comics } from '../components/Comics';
import { Header } from '../components/Header';
import { ComicsAPI } from '../api/ComicsAPI';

export const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [characters, setCharacters] = useState('');

  if (searchResults.length === 0) {
    ComicsAPI.get()
      .then((response) => {
        setSearchResults(response.data.data.results);
      })
      .catch((err) => console.log(err));
  } else {
    console.log('searchResults', searchResults);
  }

  const handleSearch = (e) => setCharacters(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCharacter(characters);
    setCharacters('');
  };

  const displayCharacters = searchCharacter
    ? searchResults.filter((result) =>
        result.title
          .toLowerCase()
          .includes(searchCharacter.toLowerCase()),
      )
    : searchResults;

  console.log(displayCharacters);

  return (
    <>
      <Header
        characters={characters}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
      />
      <section className="listContainer">
        <Comics displayCharacters={displayCharacters} />
      </section>
    </>
  );
};
