import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
<<<<<<< HEAD
import ItemDetails from './ItemDetail';

const ItemSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
=======

const ItemSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
>>>>>>> 91ac9a82 (Initial commit)

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
<<<<<<< HEAD
      const response = await axios.get('http://localhost:5001/api/items', {
        params: { search: searchTerm, category: category }
=======
      const response = await axios.get(`http://localhost:5001/api/items`, {
        params: { search: searchTerm }
>>>>>>> 91ac9a82 (Initial commit)
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
      setError('Failed to search items');
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

=======
>>>>>>> 91ac9a82 (Initial commit)
  return (
    <div className="item-search">
      <h2>Search Items</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
          placeholder="Search by Item name"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search by Category"
=======
          placeholder="Search by name"
>>>>>>> 91ac9a82 (Initial commit)
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
<<<<<<< HEAD
      {!loading && !error && (
        <div className="results-container">
          <ItemList items={items} onItemClick={handleItemClick} />
          <div className="details-container">
            {selectedItem ? (
              <ItemDetails item={selectedItem} />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
=======
      {!loading && !error && <ItemList items={items} />}
>>>>>>> 91ac9a82 (Initial commit)
    </div>
  );
};

<<<<<<< HEAD
export default ItemSearch;
=======
export default ItemSearch;
>>>>>>> 91ac9a82 (Initial commit)
