const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");
const { createVideo } = require("../controllers/VideoController");

router.post("/upload", authMiddleware, upload.single("video"), createVideo);

module.exports = router;
