import React, { useState } from 'react';

const ItemDetail = ({ item, onBidSubmit }) => {
  const [bidPrice, setBidPrice] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBidSubmit(item._id, bidPrice, email);
    setBidPrice('');
    setEmail('');
  };

  return (
    <div className="item-details">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
      <h3>Bids: {item.bids.length}</h3>
      
      <form onSubmit={handleSubmit}>
        <label>
          Bid Price:
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

export default ItemDetail;
