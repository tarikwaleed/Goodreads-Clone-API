const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const auth=require('../middlewares/auth');



router.get('/:id', bookController.book_details);
router.get('/',bookController.book_list);

module.exports = router;

