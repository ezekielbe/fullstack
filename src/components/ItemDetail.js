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
    </div>
  );
};

export default ItemDetails;

