const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

// GET request for list of all user.
router.get("/users", user_controller.user_list);

// GET request for one user.
router.get("/:id", user_controller.user_detail);

// POST request to update user.
router.put("/:id", user_controller.user_update);

// POST request to delete user.
router.delete("/:id", user_controller.user_delete);

//POST request for creating user.
router.post("/create", user_controller.user_create_post);

/////not implemented
// GET request for creating a user. NOTE This must come before route that displays user (uses id).
router.get("/create", user_controller.user_create_get);
// GET request to delete user.
router.get("/user/:id/delete", user_controller.user_delete_get);

// GET request to update user.
router.get("/user/:id/update", user_controller.user_update_get);

module.exports = router;
