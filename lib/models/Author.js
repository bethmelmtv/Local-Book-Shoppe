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
}

module.exports = { Author };
