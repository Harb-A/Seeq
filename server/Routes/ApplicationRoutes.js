const express = require("express");
const router = express.Router();
const  { apply } = require("../Controllers/ApplicationController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);


module.exports = router;