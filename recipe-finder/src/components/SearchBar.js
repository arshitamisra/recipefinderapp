import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const cleanedQuery = query
      .split(',')
      .map((ingredient) => ingredient.trim())
      .join(',');
    onSearch(cleanedQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients separated by commas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
