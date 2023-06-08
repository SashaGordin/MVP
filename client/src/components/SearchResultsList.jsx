import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchResult from './SearchResult';

function SearchResultsList() {
  const { searchTerm } = useParams();
  const location = useLocation();
  const searchData = location.state.data;
  const zip = localStorage.getItem('zipcode');

  return (
    <div className="main_info">
      <h1>
        Results for
        {' '}
        {searchTerm}
        {' '}
        near
        {' '}
        {zip}
      </h1>
      <div className="wrapper">
        {searchData.map((contractor) => (
          // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
          <SearchResult key={contractor._id} {...contractor} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultsList;
