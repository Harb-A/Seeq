const express = require("express");
const router = express.Router();
const { getUsers, getPosts, getPost } = require("../Controllers/UserController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

// route link (http://localhost:3000/users/)
router.route("/").get(getUsers);

// route link (http://localhost:3000/users/getposts)
// router.route("/getposts").get(getPosts);
router.route("/getpost/:pId").get(getPost);
module.exports = router;
