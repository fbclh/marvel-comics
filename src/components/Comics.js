import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { API } from '../api/API';
import styles from '../styles/Comics.module.css';

export const Comics = ({ comics }) => {
  const [paginateComics, setPaginate] = useState([].slice(0, 100));
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

  const pageCount = Math.ceil(paginateComics.length / comicsPerPage);

  const displayComics = paginateComics
    .slice(pagesVisited, pagesVisited + comicsPerPage)
    .map((paginate) => (
      <section className={styles.section}>
      <ul className={styles.ul}>
        <li className={styles.li} key={paginate.id}>
          <img
            className={styles.img}
            src={`${paginate.thumbnail.path}.${paginate.thumbnail.extension}`}
            alt={paginate.title}
          />
        </li>
      </ul>
      </section>
    ));

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (

    <div className="container">
      {displayComics}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
};
