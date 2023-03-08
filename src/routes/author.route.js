const express = require("express");
const router = express.Router();
const author_controller = require("../controllers/author.controller");

// GET request for list of all Authors.
router.get("/authors", author_controller.author_list);

// GET request for one Author.
router.get("/:id", author_controller.author_detail);

// GET request to delete Author.   //not implementing
router.get("/:id/delete", author_controller.author_delete_get);

// POST request to delete Author.
router.delete("/:id", author_controller.author_delete);

// GET request to update Author.  //not implementing
router.get("/:id/update", author_controller.author_update_get);

// POST request to update Author.
router.put("/:id", author_controller.author_update);

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/create", author_controller.author_create_get);

// POST request for creating Author.
router.post("/create", author_controller.author_create_post);

module.exports = router;
