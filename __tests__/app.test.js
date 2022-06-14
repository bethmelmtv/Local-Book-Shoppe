const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { books } = require('../data/books');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books should return a list of all books', async () => {
    const resp = await request(app).get('/books');
    const expected = books.map((book) => {
      return { id: book.id, title: book.title, released: book.released };
    });
    expect(resp.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
