<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-detail">
      <h2>{item.title}</h2>
      <p><strong>Description:</strong> {item.description}</p>
      <img src={`http://localhost:5001/${item.image}`} alt={item.title} />
      <h3>Bids: {item.bids.length}</h3>
      <ul>
        {item.bids.map((bid, index) => (
          <li key={index}>${bid.price} on {new Date(bid.date).toLocaleDateString()}</li>
        ))}
      </ul>
>>>>>>> 91ac9a82 (Initial commit)
    </div>
  );
};

<<<<<<< HEAD
export default ItemDetail;
=======
export default ItemDetails;

>>>>>>> 91ac9a82 (Initial commit)
