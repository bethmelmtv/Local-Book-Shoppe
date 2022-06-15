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

  .get('/:id', async (req, res, next) 
// .post('/', async (req, res, next) => {
//   try {
//     const author = await Author.insert(req.body);
//     if (req.body.bookId) {
//       await Promise.all(
//         req.body.bookId.map((book_id) => author.addBookbyId(book_id))
//       );
//     }
//     console.log(author);
//     res.json(author);
//   } catch (error) {
//     next(error);
//   }
//the colon is allowing id to be dynamic;