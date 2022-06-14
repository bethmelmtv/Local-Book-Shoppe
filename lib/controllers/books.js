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

  .get('/:id');
//the colon is allowing id to be dynamic;
