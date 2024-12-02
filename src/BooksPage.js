import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from './components/BookList';
import './App.css';

const BooksPage = () => {
  // Manage the state of books
  const [books, setBooks] = useState([
    { id: 1, title: 'Book One', author: 'Author One', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Book Two', author: 'Author Two', price: 24.99, image: 'https://via.placeholder.com/150' },
  ]);

  // Handle delete book
  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks); // Update the state with the new list of books
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Books List</h1>
      <div className="mb-4">
        <Link to="/add-book" className="btn btn-primary">
          Add New Book
        </Link>
      </div>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default BooksPage;
