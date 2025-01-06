/* 
  * this component renders and sets the search term so parent component can sort
*/

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const SearchBar = ({ setSearchTerm }) => {
  //* USESTATE
  const [inputValue, setInputValue] = useState('')

  //* RENDER
  return (
    <>
      <form action="">
        
        {/* input field */}
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* button to search */}
        <input
          type="button"
          value="Search"
          onClick={() => (setSearchTerm(inputValue))}
        />
      </form>
    </>
  )
}

export default SearchBar
