import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ zip }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // submit get request or just filter the current values
    axios.get(`/contractors?zip=${zip}&search=${search}`)
      .then((res) => {
        const searchData = res.data;
        const state = {
          data: searchData,
        };
        navigate(`/search-results/${search}`, { state });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={submitHandler} className="search_bar">
      <input onChange={changeHandler} id="search_input" className="search_input" type="search" placeholder="Search for any service..." />
      <button className="search_button" type="submit">
        <FontAwesomeIcon icon={faSearch} className="search_icon" />
      </button>
    </form>
  );
}

export default SearchBar;
