const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// router.post('/book', bookController.book_create);
router.get('/:id', bookController.book_details);
// router.get('/books', bookController.book_list);
// router.put('/book/:id', bookController.book_update);
// router.delete('/book/:id', bookController.book_delete);

module.exports = router;

