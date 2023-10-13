import React, { useState } from 'react';
import AddBookForm from './AddBookForm';
import PageTitle from './PageTitle';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState();

  async function addBook(newBook) {
    try {
      console.log(newBook);
      const response = await fetch(`/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      const statusCode = response.status;
      if (!response.ok) {
        throw new Error(statusCode);
      }
      const result = await response.json();
      setBooks(books.concat(result));
    } catch (err) {
      setError(err);
    }
  }

  if (error) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <PageTitle text="Add a Book" />
          <AddBookForm onSubmit={addBook} />
        </div>
      </div>
    </div>
  );
}
