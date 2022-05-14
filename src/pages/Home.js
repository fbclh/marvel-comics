import { Characters } from '../components/Characters';
import { Comics } from '../components/Comics';
import { Header } from '../components/Header';
// import  { Pagination } from '.components/Pagination';
import { useEffect, useState } from 'react';
import { CharactersAPI } from '../api/CharactersAPI';

export const Home = () => {
  const [characters, setCharacters] = useState('');
  const [charSearch, setCharSearch] = useState(characters);
  const [searchResults, setSearchResults] = useState([]);

  // wait 1 sec to the user type the search (avoid requests while the user is typing)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setCharSearch(characters);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [characters]);

  useEffect(() => {
    const search = () => {
      CharactersAPI.get()
        .then((response) => {
          setSearchResults(response.data.data.results);
        })
        .catch((err) => console.log(err));
    };
    if (charSearch) {
      search();
    }
  }, [charSearch]);

  const filteredComics = !!charSearch 
    ? searchResults.filter((result) => {
        return result.name.toLowerCase().includes(charSearch.toLowerCase());
      })
    : searchResults;

  const handleOnChange = (e) => setCharacters(e.target.value);

  return (
    <>
      <Header characters={characters} handleOnChange={handleOnChange} />
      <section className="listContainer">
        {filteredComics.length > 0 && (
          <Characters comics={filteredComics[0].comics.items} />
        )}
        {filteredComics.length === 0 && <Comics />}
      </section>
    </>
  );
};
