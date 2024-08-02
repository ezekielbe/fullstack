import React from 'react';

const ItemList = ({ items, onItemClick }) => {
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item._id} onClick={() => onItemClick(item)}>
          <a href="#">{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
