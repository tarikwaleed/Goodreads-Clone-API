const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');



router.get('/:id', bookController.book_details);
router.get('/', bookController.book_list);

module.exports = router;

