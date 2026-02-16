const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");
const {
  createVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
} = require("../controllers/VideoController");

router.post("/upload", authMiddleware, upload.single("video"), createVideo);
router.get("/allVideos", authMiddleware, getAllVideos);
router.get("/:id", authMiddleware, getVideoById);
router.delete("/:id", authMiddleware, deleteVideo);

module.exports = router;
