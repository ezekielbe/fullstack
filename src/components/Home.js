import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [totalBids, setTotalBids] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidPrice, setBidPrice] = useState('');
  const [email, setEmail] = useState(''); // State for email

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_BASE_URL}/api/items');
        setItems(response.data);

        const total = response.data.reduce((sum, item) => sum + item.bids.length, 0);
        setTotalBids(total);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (!bidPrice || !email) {
      alert('Please enter a bid price and email.');
      return;
    }

    try {
      console.log("Submitting bid:", { price: bidPrice, email: email, itemId: selectedItem._id });
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/items/${selectedItem._id}`, {
        price: bidPrice,
        email: email,
      });

      // Update the selected item with the new bids
      setSelectedItem(response.data);

      // Update total bids
      setTotalBids(totalBids + 1);

      // Clear the bid form
      setBidPrice('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="total-bids-box">
        <h2>Total Bids</h2>
        <p>{totalBids}</p>
      </div>
      <div className="main-content">
        <div className="item-list">
          <h2>Items</h2>
          <ul>
            {items.map((item) => (
              <li key={item._id} onClick={() => selectItem(item)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="item-details">
          {selectedItem ? (
            <>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <img src={`data:image/jpeg;base64,${selectedItem.image}`} alt={selectedItem.title} />
              <h3>Bids: {selectedItem.bids.length}</h3>
              <form onSubmit={handleBidSubmit}>
                <label>
                  Bid Price:
                  <input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Submit Bid</button>
              </form>
            </>
          ) : (
            <p>Select an item to see the details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
