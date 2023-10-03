import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  errorMiddleware,
  defaultMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/books', async (req, res, next) => {
  try {
    const { title, author, summary, enjoyed } = req.body;
    if (!title || !author) {
      throw new ClientError(400, 'title and author are required');
    }
    const sql = `
      insert into "books" ("title", "author", "summary", "enjoyed")
        values ($1, $2, $3, $4)
        returning *
    `;
    const params = [title, author, summary, enjoyed];
    const result = await db.query(sql, params);
    const [book] = result.rows;
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
