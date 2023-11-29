const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const loginLimiter = require("../Middleware/Loginlimit");

const { login, refresh, logout } = require("../Controllers/AuthController");
// login
router.post("/", login);
// refresh
router.route("/refresh", refresh).get();
// logout
router.route("/logout", logout).post();

module.exports = router;
