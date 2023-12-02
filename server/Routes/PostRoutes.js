const express = require("express");
const router = express.Router();
const {getPosts} = require("../Controllers/PostController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

router.route("/").get(getPosts);

module.exports = router;