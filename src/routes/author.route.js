
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');



router.get('/:id', authorController.author_details);
router.get('/', authorController.authors_list);

module.exports = router;