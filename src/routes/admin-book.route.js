const express = require('express');
const auth = require('../middlewares/auth');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router.post('/', auth, bookController.book_create);
router.put('/:id', auth, bookController.book_update);
router.delete('/:id', auth, bookController.book_delete);

module.exports = router;
