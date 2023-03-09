const express = require("express");
const router = express.Router();
const rating_controller = require("../controllers/rating.controller");

// GET request for list of all rating.
router.get("/ratings", rating_controller.rating_list);

// GET request for one rating.
router.get("/:id", rating_controller.rating_detail);

// POST request to delete rating.
router.delete("/:id", rating_controller.rating_delete);

// POST request to update rating.
router.put("/:id", rating_controller.rating_update);

//POST request for creating rating.
router.post("/create", rating_controller.rating_create_post);

/////not implemented
// GET request for creating a rating. NOTE This must come before route that displays rating (uses id).
router.get("/create", rating_controller.rating_create_get);
// GET request to delete rating.
router.get("/rating/:id/delete", rating_controller.rating_delete_get);

// GET request to update rating.
router.get("/rating/:id/update", rating_controller.rating_update_get);

module.exports = router;
