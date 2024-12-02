import React from 'react';
import booksData from './booksData.json';

const App = () => {
  return (
    <div>
      <h1>Books List</h1>
      {booksData.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Price: ${book.price.toFixed(2)}</p>
          <img src={book.image} alt={book.title} />
        </div>
      ))}
    </div>
  );
};

export default App;
