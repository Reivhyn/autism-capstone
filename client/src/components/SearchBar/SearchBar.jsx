/* 
  * this component renders and sets the search term so parent component can sort
*/

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ setSearchTerm }) => {
const [inputValue, setInputValue] = useState('');
const theme = useTheme();

  const handleSubmit = (e) => {
    console.log(e) // Can take out
    console.log(inputValue) // Can take out
    e.preventDefault();
    setSearchTerm(inputValue); // Update search term in parent
  };

  return (
   //*Input Field*//
    <form onSubmit={handleSubmit} className="search-bar-form">
      <TextField
        variant="outlined"
        placeholder="Search activities..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update local state
        InputProps={{
          sx: {
            backgroundColor: theme.palette.background.paper, // Use theme background
            color: theme.palette.text.primary, // Text color from theme
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main, // Border color from theme
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main, // Change on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.dark, // Focus border color
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => handleSubmit(e)} // Allow search via button click
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