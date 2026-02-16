const Bookmark = require("../models/Bookmark");
const Video = require("../models/Video");

const addBookmark = (req, res) => {
  const { video_id } = req.params;
  const { timestamp, title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 0,
      message: "Title must be provided",
    });
  }

  Video.findByPk(video_id).then((video) => {
    if (!video) {
      return res.status(404).json({
        status: 0,
        message: "Video not found",
      });
    }
    return Bookmark.create({
      video_id,
      user_id: req.user.user_id,
      timestamp,
      title,
    })
      .then((bookmark) => {
        res.status(201).json({
          status: 1,
          data: bookmark,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 0,
          data: err.message,
        });
      });
  });
};

module.exports = addBookmark;
