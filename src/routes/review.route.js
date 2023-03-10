const express = require("express");
const router = express.Router();
const review_controller = require("../controllers/review.controller");

// GET request for list of all review.
router.get("/reviews", review_controller.review_list);

// GET request for one review.
router.get("/:id", review_controller.review_detail);

// POST request to update review.
router.put("/:id", review_controller.review_update);

// POST request to delete review.
router.delete("/:id", review_controller.review_delete);

//POST request for creating review.
router.post("/create", review_controller.review_create_post);

/////not implemented
// GET request for creating a review. NOTE This must come before route that displays review (uses id).
router.get("/create", review_controller.review_create_get);
// GET request to delete review.
router.get("/review/:id/delete", review_controller.review_delete_get);

// GET request to update review.
router.get("/review/:id/update", review_controller.review_update_get);

module.exports = router;
