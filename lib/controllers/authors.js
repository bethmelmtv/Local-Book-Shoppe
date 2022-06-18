const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const authors = await Author.getAllAuthors();
      res.json(authors);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getbyId(req.params.id);
      res.json(author);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      if (req.body.bookId) {
        await Promise.all(
          req.body.bookId.map((book_id) => author.addBookbyId(book_id))
        );
      }
      console.log(author);
      res.json(author);
    } catch (error) {
      next(error);
    }
  });
