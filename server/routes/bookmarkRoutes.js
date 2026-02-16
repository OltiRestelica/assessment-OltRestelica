const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const addBookmark = require("../controllers/BookmarkController");

router.post("/:video_id/addBookmark", authMiddleware, addBookmark);

module.exports = router;