/* 
  * this component renders and sets the search term so parent component can sort
*/

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'; // Import the CSS file

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchTerm(inputValue);
      }}
      className="search-bar-form"
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setSearchTerm(inputValue)}
                edge="end"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="custom-search-field" // Apply custom class
      />
    </form>
  );
};

export default SearchBar;
