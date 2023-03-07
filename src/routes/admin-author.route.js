const express = require('express');
const auth = require('../middlewares/auth');
const authorController = require('../controllers/author.controller');

const router = express.Router();

router.post('/',  authorController.author_create);
router.put('/:id', auth, authorController.author_update);
router.delete('/:id', auth, authorController.author_delete);

module.exports = router;
