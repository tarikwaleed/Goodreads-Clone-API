const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.get("/", user_controller.user_list);

router.get("/:id", user_controller.user_detail);
router.put("/:id", user_controller.user_update);
router.delete("/:id", user_controller.user_delete);
router.post("/create", user_controller.user_create_post);
router.get("/create", user_controller.user_create_get);
router.get("/user/:id/delete", user_controller.user_delete_get);
router.get("/user/:id/update", user_controller.user_update_get);

module.exports = router;
