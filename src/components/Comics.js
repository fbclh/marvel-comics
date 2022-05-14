import { useEffect, useState } from 'react';
import { ComicsAPI } from '../api/ComicsAPI';

export const Comics = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    ComicsAPI.get()
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

 comics.sort((a, b) => b.id - a.id);

  return (
    <section className="homeContainer">
      <ul className="characterArea">
        {comics.map((comic) => (
          <li className="characterItem" key={comic.id}>
            <img
              className="characterAreaImg"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
