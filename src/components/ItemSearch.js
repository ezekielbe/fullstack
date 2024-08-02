import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import ItemDetails from './ItemDetail';

const ItemSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5001/api/items', {
        params: { search: searchTerm, category: category }
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
      setError('Failed to search items');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="item-search">
      <h2>Search Items</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Item name"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search by Category"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
    </div>
  );
};

export default ItemSearch;
