const express = require("express");
const router = express.Router();
const genre_controller = require("../controllers/genre.controller");

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

// GET request for one Genre.
router.get("/:id", genre_controller.genre_detail);

// POST request to delete Genre.
router.delete("/:id", genre_controller.genre_delete);

// POST request to update Genre.
router.put("/:id", genre_controller.genre_update);

//POST request for creating Genre.
router.post("/create", genre_controller.genre_create_post);

/////not implemented
// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/create", genre_controller.genre_create_get);
// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

module.exports = router;
