import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import UploadItem from './components/UploadItem';
import ItemDetail from './components/ItemDetail';
import ItemList from './components/ItemList';
import ItemSearch from './components/ItemSearch';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadItem />} />
        <Route path="/detail" element={<ItemDetail />} />
        <Route path="/list" element={<ItemList />} />
        <Route path="/search" element={<ItemSearch />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
