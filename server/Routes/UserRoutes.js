const express = require('express');
const router = express.Router();
const getUsers = require("../Controllers/UserController");
const verifyJWT = require("../Middleware/VerifyJWT")

router.use(verifyJWT)

// route link (http://localhost:3000/api/users/getall)
router.get("/getall", (req, res) =>{
  getUsers();
})

module.exports = router;
