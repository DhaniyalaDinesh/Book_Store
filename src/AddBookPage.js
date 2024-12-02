// src/AddBookPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AddBookPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (add book)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(), // Generate unique ID based on timestamp
      ...formData,
    };

    // Get the books from localStorage or use an empty array
    const books = JSON.parse(localStorage.getItem('books')) || [];
    
    // Save the new book in the books array
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books)); // Save updated list back to localStorage
    
    navigate('/'); // Redirect to the books list page
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
