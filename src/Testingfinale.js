// src/App.js

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // State to manage books
  const url = "http://localhost:8080/books";

  const deleteBookAPi = async (data) => {
    await fetch(`${url}/${data}`, {
      method: "DELETE",
    }).then((response) => {
      if (response?.ok) {
        alert("Removed book successfully");
      }
      response.json();
    });
  };

  const addBooksApi = async (data) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response?.ok) {
        alert("Added book successfully");
      }
      response.json();
    });
  };

  const updateBookApi = async (data, newBook) => {
    await fetch(`${url}/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    }).then((response) => {
      if (response?.ok) {
        alert("Updated book successfully");
      }
      response.json();
    });
  };

  const fetchBooks = async () => {
    const result = await fetch(url).then((response) => {
      if (response?.ok) {
        return response.json();
      }
    });
    return result;
  };
  const [books, setBooks] = useState([]);

  // State for form input (for both Add and Edit)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });

  // State to track whether we are editing or adding a new book
  const [editing, setEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  // Handle input changes for the new book form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price || !newBook.image) {
      alert("Please fill in all fields");
      return;
    }

    const newBookEntry = {
      id: Date.now(),
      ...newBook,
    };
    const result = await addBooksApi(newBookEntry);
    setNewBook({
      title: "",
      author: "",
      price: "",
      image: "",
    }); // Reset form
  };

  // Handle editing an existing book
  const handleEditBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price || !newBook.image) {
      alert("Please fill in all fields");
      return;
    }
    await updateBookApi(editBookId, newBook);
    setNewBook({
      title: "",
      author: "",
      price: "",
      image: "",
    });
    setEditing(false);
    setEditBookId(null);
  };

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    await deleteBookAPi(id);
  };

  // Set the form to editing mode with the selected book's data
  const handleEditClick = (book) => {
    console.log(book, "book data");
    setNewBook({
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    });
    setEditing(true);
    setEditBookId(book.id);
  };

  useEffect(() => {
    fetchBooks().then((result) => {
      setBooks(result);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Books Store</h1>

      {/* Add/Edit Book Form */}
      <div className="mb-4">
        <h3>{editing ? "Edit Book" : "Add New Book"}</h3>
        <form onSubmit={editing ? handleEditBook : handleAddBook}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={newBook.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editing ? "Save Changes" : "Add Book"}
          </button>
        </form>
      </div>

      <hr />

      {/* Books List */}
      <h3 className="mb-4">Books List</h3>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card shadow-sm">
              <img src={book.image} className="card-img-top" alt={book.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: ${book.price}</p>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
