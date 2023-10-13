import React, { useEffect, useState } from 'react';
import PageTitle from './PageTitle';
import BookList from './BookList';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchBooks().then((json) => {
      setBooks(json);
      setIsLoading(false);
    });
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch(`/api/books`);
      const statusCode = response.status;
      if (!response.ok) {
        throw new Error(statusCode);
      }
      const booksJSON = await response.json();
      return booksJSON;
    } catch (err) {
      setError(err);
    }
  }

  if (books.length === 0) setBooks(['No Books in Journal']);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <PageTitle text="Books in Journal" />
          <BookList books={books} />
        </div>
      </div>
    </div>
  );
}
