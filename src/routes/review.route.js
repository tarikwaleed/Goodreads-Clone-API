const express = require("express");
const router = express.Router();
const review_controller = require("../controllers/review.controller");

router.get("/", review_controller.review_list);
router.post("/", review_controller.review_create_post);
router.delete("/", review_controller.review_delete);


module.exports = router;
