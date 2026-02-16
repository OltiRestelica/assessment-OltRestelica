const Video = require("../models/Video");
const Annotation = require("../models/Annotation");
const Bookmark = require("../models/Bookmark");
const User = require("../models/User");

const createVideo = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 0,
      message: "Title must be provided",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      status: 0,
      message: "Video file must be provided",
    });
  }

  const videoUrl = `/uploads/${req.file.filename}`;

  Video.create({
    title,
    fileUrl: videoUrl,
    user_id: req.user.user_id,
  })
    .then((video) => {
      res.status(201).json({
        status: 1,
        data: video,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        data: err.message,
      });
    });
};

module.exports = { createVideo };
