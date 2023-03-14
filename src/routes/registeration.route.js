
const express = require("express");
const router = express.Router();
const registration_controller = require("../controllers/registration.controller");

router.post('/login', registration_controller.login)
router.post('/register', registration_controller.register)
router.post('/create_admin', registration_controller.create_admin)
module.exports = router;