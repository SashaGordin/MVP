import React from 'react';

function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site_title">contractors delight</a>
      <ul>
        <li>
          <a href="/addContractor">Add Contractor</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
