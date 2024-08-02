import React from 'react';

const ItemDetail = ({ item }) => {
  return (
    <div className="item-details">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
      <h3>Bids: {item.bids.length}</h3>
      
      <form>
        <label>
          Bid Price:
          <input type="number" placeholder="Enter your bid" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

export default ItemDetail;
