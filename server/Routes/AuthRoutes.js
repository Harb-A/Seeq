const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

const { login, refresh, logout } = require("../Controllers/AuthController");

// login
// route link (http://localhost:3000/auth/)
router.post("/", login);

// refresh
// route link (http://localhost:3000/auth/refresh)
router.route("/refresh", refresh).get();

// logout
// route link (http://localhost:3000/auth/logout)
router.route("/logout", logout).post();

module.exports = router;
