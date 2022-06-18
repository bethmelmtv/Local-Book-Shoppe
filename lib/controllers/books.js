const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();
      res.json(books);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const books = await Book.insert(req.body);
      res.json(books);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Book.getBookById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
