const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

router.get("/popular", authorController.popular_author_list);
router.get("/", authorController.authors_list);
router.get("/:id", authorController.author_details);
module.exports = router;
