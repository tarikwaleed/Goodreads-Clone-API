const express = require("express");
const router = express.Router();
const rating_controller = require("../controllers/rating.controller");

router.get("/", rating_controller.rating_list);
router.get("/:id", rating_controller.rating_detail);
router.put("/", rating_controller.rating_update);
router.delete("/:id", rating_controller.rating_delete);
router.post("/", rating_controller.rating_create);

module.exports = router;
