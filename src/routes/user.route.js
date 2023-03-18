const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.get("/", user_controller.user_list);

router.get("/:id", user_controller.user_detail);
router.put("/:id", user_controller.user_update);
router.delete("/:id", user_controller.user_delete);
router.post("/create", user_controller.user_create_post);

module.exports = router;
