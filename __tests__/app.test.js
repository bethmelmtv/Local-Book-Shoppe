const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { books } = require('../data/books');
const { authors } = require('../data/authors');

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

  it('/authors should return a list of all authors', async () => {
    const resp = await request(app).get('/authors');
    const expected = authors.map((author) => {
      return { id: author.id, name: author.name };
    });
    expect(resp.body).toEqual(expected);
  });

  it('/authors/:id should return author detail with books', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.body.id).toEqual('1');
    expect(resp.body.name).toEqual('Ernest Hemmingway');
  });

  it('POST/author should create a new author', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({ name: 'Harriet', bookId: [1] });
    console.log(resp);
    expect(resp.body.name).toBe('Harriet');
  });

  afterAll(() => {
    pool.end();
  });
});
