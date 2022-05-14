import { Comics } from './Comics';

export const Characters = ({ comics }) => (
  <ul className="characterArea">
    {comics.map((comic) => (
      <Comics />
    ))}
  </ul>
);
