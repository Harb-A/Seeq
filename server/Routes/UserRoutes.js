const express = require("express");
const router = express.Router();
const { getUsers, getUser, updateUser } = require("../Controllers/UserController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

// route link (http://localhost:4000/users/)
router.route("/").get(getUsers);
// route link (http://localhost:4000/users/current)
router.route("/current").get(getUser);
// // route link (http://localhost:4000/users/update)
router.route("/update").put(updateUser);
module.exports = router;
