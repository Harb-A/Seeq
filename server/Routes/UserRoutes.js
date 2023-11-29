const express = require("express");
const router = express.Router();
const { getUsers, getPosts } = require("../Controllers/UserController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

// route link (http://localhost:3000/users/getallusers)
router.route("/getallusers").get(getUsers);

// route link (http://localhost:3000/users/getposts)
router.route("/getposts").get(getPosts);
module.exports = router;
