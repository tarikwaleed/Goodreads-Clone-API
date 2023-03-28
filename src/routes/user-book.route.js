const express = require("express");
const router = express.Router();
const userBookController = require("../controllers/user-book.controller");

router.get("/", userBookController.user_books_list);
router.get("/search", userBookController.user_book_details);
router.put("/", userBookController.update_user_book);
router.delete("/", userBookController.delete_user_book);

router.get(
  "/c",
  userBookController.user_books_currentlyReading_list
);
router.get("/w", userBookController.user_books_wantToRead_list);
router.get("/r", userBookController.user_books_read_list);

module.exports = router;
