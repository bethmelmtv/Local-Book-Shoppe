const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    console.log(rows);
    return rows.map((row) => new Book(row));
  } // this model will get all books

  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) as authors from books 
      LEFT JOIN books_authors on books.id = books_authors.book_id
      LEFT JOIN authors on books_authors.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
