import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/search">Search</Link> 
    </nav>
  </header>
);

export default Header;
