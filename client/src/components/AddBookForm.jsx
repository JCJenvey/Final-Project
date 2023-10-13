import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBookForm.css';

export default function AddBookForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [enjoyed, setEnjoyed] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const newBook = {
      title,
      author,
      summary,
      enjoyed,
    };
    onSubmit(newBook);
    setTitle('');
    setAuthor('');
    setSummary('');
    setEnjoyed(false);
    navigate('/');
  }

  return (
    <form className="input-group mb-4 shadow-sm col" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title</label>
        <input
          required
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          id="title"
        />
      </div>

      <div>
        <label htmlFor="author">The Author</label>
        <input
          required
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-control"
          id="author"
        />
      </div>

      <div>
        <label htmlFor="summary">Summary (optional)</label>
        <textarea
          onChange={(e) => setSummary(e.target.value)}
          className="form-control"
          id="summary"
          value={summary}
        />
      </div>

      <div>
        <label htmlFor="enjoyed">Did you enjoy it?</label>
        <input
          type="checkbox"
          checked={enjoyed}
          onChange={(e) => setEnjoyed(e.target.checked)}
          className="form-control"
          id="enjoyed"
        />
      </div>

      <div className="input-group-append pad">
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </div>
    </form>
  );
}
