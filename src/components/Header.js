import logo from '../assets/logo.svg';
// import './style.css';

export const Header = ({ characters, handleOnChange }) => (
  <header className="headerArea">
    <div className="header">
      <img src={logo} alt="Marvel logo" height="75" />
    </div>
    <form className="searchInput">
      <input
        className="input"
        type="search"
        placeholder="Search character"
        value={characters}
        onChange={handleOnChange}
      />
    </form>
  </header>
);
