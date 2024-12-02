import React, { useState } from 'react';

const AddBook = ({ addBook }) => {
  const [book, setBook] = useState({ title: '', author: '', price: '', image: '' });

  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ ...book, price: parseFloat(book.price), id: Date.now() });
    setBook({ title: '', author: '', price: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-3">
          <input type="text" name="title" placeholder="Title" className="form-control" value={book.title} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="text" name="author" placeholder="Author" className="form-control" value={book.author} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input type="number" name="price" placeholder="Price" className="form-control" value={book.price} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="text" name="image" placeholder="Image URL" className="form-control" value={book.image} onChange={handleChange} required />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-success">Add</button>
        </div>
      </div>
    </form>
  );
};

export default AddBook;
