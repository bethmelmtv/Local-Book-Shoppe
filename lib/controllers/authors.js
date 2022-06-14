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
  .get('/authors/:id', async (req, res, next) => {
    try {
      const author = await Author.getbyId(req.params.id);
      res.json(author);
    } catch (e) {
      next(e);
    }
  });
