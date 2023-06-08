import React from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AddContractor from './AddContractor';
import SearchResultsList from './SearchResultsList';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addContractor" element={<AddContractor />} />
          <Route path="/search-results/:searchTerm" element={<SearchResultsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
