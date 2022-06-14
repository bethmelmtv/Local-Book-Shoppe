const pool = require('../utils/pool');

class Author {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async getAllAuthors() {
    const { rows } = await pool.query('SELECT * from authors');
    console.log(rows);
    return rows.map((row) => new Author(row));
  }

  static async getbyId(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE book.id IS NOT NULL), '[]'
    ) as books from authors 
      LEFT JOIN books_author on authors.id = books_authors.author_id 
      LEFT JOIN books on books_authors.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
