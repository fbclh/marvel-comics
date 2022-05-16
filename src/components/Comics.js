import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { API } from '../api/API';
import styles from '../styles/Comics.module.css';

export const Comics = ({ comics }) => {
  const [paginateComics, setPaginate] = useState([].slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    API.get()
      .then((response) => {
        setPaginate(response.data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const comicsPerPage = 10;
  const pagesVisited = pageNumber * comicsPerPage;

  const displayComics = paginateComics
    .slice(pagesVisited, pagesVisited + comicsPerPage)
    .map((paginate) => {
      return (
        <section className={styles.section}>
          <ul className={styles.ul}>
            {comics
              .sort((a, b) => b.id - a.id) // Sort comics in descending order
              .map((comic) => (
                <li className={styles.li} key={comic.id}>
                  <img
                    className={styles.img}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </li>
              ))}
          </ul>
        </section>
      );
    });

  const pageCount = Math.ceil(paginateComics.length / comicsPerPage);

  const handleChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      {displayComics}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handleChangePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
};
