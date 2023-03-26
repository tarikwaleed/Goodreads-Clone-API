const express = require('express');
const auth = require('../middlewares/auth');
const authorController = require('../controllers/author.controller');
const upload = require('../middlewares/image_upload');

const router = express.Router();

router.post('/', upload.single('photo'), authorController.author_create);
router.put('/:id',  authorController.author_update);
router.delete('/:id', authorController.author_delete);

module.exports = router;
