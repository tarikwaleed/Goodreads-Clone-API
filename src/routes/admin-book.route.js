const express = require("express");
const auth = require("../middlewares/auth");
const bookController = require("../controllers/book.controller");
const upload = require("../middlewares/image_upload");
const multer = require("multer");

const router = express.Router();

router.post("/", upload.single("coverImage"), bookController.book_create);
router.put("/", upload.single("coverImage"), bookController.book_update);
router.delete("/:id", bookController.book_delete);

module.exports = router;
