import React, { useState } from 'react';
import './styles/SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          className="input"
          type="text"
          placeholder="Search for Recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      <button className="btn1" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
