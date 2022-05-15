export const Comics = ({ comics }) => {
  comics.sort((a, b) => b.id - a.id);

  return (
    <section className="listContainer">
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

