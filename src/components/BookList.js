import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onDelete }) => {
  return (
    <div className="d-flex flex-wrap justify-content-start">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookList;
