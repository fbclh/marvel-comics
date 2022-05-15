import logo from '../assets/logo.svg';

export const Header = ({ characters, handleOnChange, handleSubmit }) => (
  <header className="headerArea">
    <div className="header">
      <img src={logo} alt="Marvel logo" height="60" />
    </div>
    <form className="searchInput" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Search character"
        value={characters}
        onChange={handleOnChange}
      />
    </form>
  </header>
);
