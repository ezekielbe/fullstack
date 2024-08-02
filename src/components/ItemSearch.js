import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';

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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        params: { search: searchTerm, category: category }
      });

      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error searching items:', error);
      setError('Failed to search items');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    console.log('Item selected:', item); // Debugging log
    setSelectedItem(item);
  };

  const handleBidSubmit = async (itemId, bidPrice, email) => {
    if (!bidPrice || !email) {
      setError('Please enter both bid price and email.');
      return;
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/items/${itemId}`, {
        price: bidPrice,
        email: email,
      });

      if (response.data) {
        // Update the selected item with the new bid
        setSelectedItem(prevItem => ({
          ...prevItem,
          bids: response.data.bids
        }));
        setError(null);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      setError('Failed to submit bid');
    }
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
              <ItemDetail item={selectedItem} onBidSubmit={handleBidSubmit} />
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
