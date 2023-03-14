const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.get("/:id", user_controller.user_books_list);

router.get(
    "/currentlyReading/:id",
    user_controller.user_books_currentlyReading_list
);
router.get("/wantToRead/:id", user_controller.user_books_wantToRead_list);
router.get("/read/:id", user_controller.user_books_read_list);

module.exports = router;