import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookCard = ({ book, onDelete, onEdit }) => {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={book.image} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          Author: {book.author} <br />
          Price: ${book.price.toFixed(2)}
        </p>
        <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
          Delete
        </button>
        <button className="btn btn-warning ml-2" onClick={() => onEdit(book)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default BookCard;


