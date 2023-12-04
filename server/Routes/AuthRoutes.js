const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const verifyJWT = require("../Middleware/VerifyJWT");


const { login, refresh, logout, register, deleteUser } = require("../Controllers/AuthController");

// login
// route link (http://localhost:4000/auth/)
router.post("/", login);

// refresh
// route link (http://localhost:4000/auth/refresh)
router.route("/refresh", refresh).get();

// logout
// route link (http://localhost:4000/auth/logout)
router.route("/logout", logout).post();

//route link (http://localhost:4000/auth/register)
router.route("/register").post(register);

router.use(verifyJWT);
// route link (http://localhost:4000/auth/delete)
router.route("/delete").delete(deleteUser);

module.exports = router;
