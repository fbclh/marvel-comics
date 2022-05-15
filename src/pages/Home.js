import { useEffect, useState } from 'react';
import { ComicsAPI } from '../api/ComicsAPI';
import { Comics } from '../components/Comics';
import { Header } from '../components/Header';

export const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [characters, setCharacters] = useState('');

  useEffect(() => {
    if (searchResults.length === 0) {
      ComicsAPI.get()
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
    </>
  );
};
