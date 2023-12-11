const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {addResume} = require("../Controllers/ResumeController");

const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);
// route link (http://localhost:4000/resumes/upload)
router.post('/upload', upload.single('resume'), addResume);

module.exports = router;