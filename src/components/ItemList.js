import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ items, onItemClick }) => {
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item._id} onClick={() => onItemClick(item)}>
          <Link to={`/items/${item._id}`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
