/* 
  * this component renders and sets the search term so parent component can sort
*/

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  return (
   //*Input Field*//
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

        //*Button To Search*//
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
        className="custom-search-field"
      />
    </form>
  );
};

export default SearchBar;