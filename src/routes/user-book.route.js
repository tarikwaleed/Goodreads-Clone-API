const express = require("express");
const router = express.Router();
const userBookController=require('../controllers/user-book.controller');

router.get("/:id", userBookController.user_books_list);

router.get(
    "/currentlyReading/:id",
    userBookController.user_books_currentlyReading_list
);
router.get("/wantToRead/:id", userBookController.user_books_wantToRead_list);
router.get("/read/:id", userBookController.user_books_read_list);

module.exports = router;