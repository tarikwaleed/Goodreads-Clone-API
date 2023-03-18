const express = require("express");
const router = express.Router();
const genre_controller = require("../controllers/genre.controller");

router.get("/", genre_controller.genre_list);
router.get("/:id", genre_controller.genre_details);
router.delete("/:id", genre_controller.genre_delete);
router.put("/:id", genre_controller.genre_update);
router.post("/", genre_controller.genre_create_post);

module.exports = router;
