import { useEffect, useState } from 'react';
import { API } from '../api/API';
import { Comics } from '../components/Comics';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [characters, setCharacters] = useState('');

  useEffect(() => {
    if (searchResults.length === 0) {
      API.get()
        .then((response) => {
          setSearchResults(response.data.data.results);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('searchResults', searchResults);
    }
  }, [searchResults]);

  const handleSearch = (e) => setCharacters(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCharacter(characters);
    setCharacters('');
  };

  const displayCharacters = searchCharacter
    ? searchResults.filter((result) =>
        result.title.toLowerCase().includes(searchCharacter.toLowerCase()),
      )
    : searchResults;

  return (
    <>
      <Header
        characters={characters}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
      />
      <Comics comics={displayCharacters} />
      <Pagination />
    </>
  );
};
