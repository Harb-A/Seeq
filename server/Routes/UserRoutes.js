const express = require("express");
const router = express.Router();
const { getUsers, updateUser } = require("../Controllers/UserController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

// route link (http://localhost:4000/users/)
router.route("/").get(getUsers);

// route link (http://localhost:4000/users/getposts)
// router.route("/getposts").get(getPosts);
// route link (http://localhost:4000/users/getpost/:pId)
// router.route("/getpost/:pId").get(getPost);
// // route link (http://localhost:4000/users/update)
router.route("/update").put(updateUser);
module.exports = router;
