import './BookList.css';

export default function TodoList({ books }) {
  if (typeof books[0] === 'string') {
    return <div>{books[0]}</div>;
  }
  return (
    <ul className="list-group shadow-sm">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </ul>
  );
}

function Book({ book }) {
  const { title, author, summary, enjoyed } = book;
  const isEnjoyed = enjoyed ? 'Liked it' : "Neutral or didn't like";
  return (
    <li className="list-group-item">
      <div>
        <h2>
          Title: <span>{title}</span>
        </h2>
        <h2>
          Author: <span>{author}</span>
        </h2>
      </div>
      <div>
        <h2>Summary:</h2>
        <p>{summary}</p>
      </div>
      <div>
        <h2>
          Enjoyment level: <span>{isEnjoyed}</span>
        </h2>
      </div>
    </li>
  );
}
