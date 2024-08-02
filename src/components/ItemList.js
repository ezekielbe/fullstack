import React from 'react';
<<<<<<< HEAD

const ItemList = ({ items, onItemClick }) => {
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item._id} onClick={() => onItemClick(item)}>
          <a href="#">{item.title}</a>
=======
import { Link } from 'react-router-dom';

const ItemList = ({ items }) => {
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item._id}>
          <Link to={`/items/${item._id}`}>
            {item.title}
          </Link>
>>>>>>> 91ac9a82 (Initial commit)
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
