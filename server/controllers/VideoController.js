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

const getAllVideos = (req, res) => {
  Video.findAll({
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((videos) => {
      res.status(200).json({
        status: 1,
        data: videos,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        data: err.message,
      });
    });
};

const getVideoById = (req, res) => {
  const { id } = req.params;
  Video.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["user_id", "name"],
      },
      {
        model: Annotation,
        where: { user_id: req.user.user_id },
        required: false,
      },
      {
        model: Bookmark,
        where: { user_id: req.user.user_id },
        required: false,
      },
    ],
  })
    .then((video) => {
      if (!video) {
        return res.status(404).json({
          status: 0,
          message: "Video not found",
        });
      }
      res.status(200).json({
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

const deleteVideo = (req, res) => {
  const { id } = req.params;
  Video.findByPk(id)
    .then((video) => {
      if (!video) {
        return res.status(404).json({
          status: 0,
          message: "Video not found",
        });
      }
      if (video.user_id !== req.user.user_id && req.user.role !== "Admin") {
        return res.status(403).json({
          status: 0,
          message: "You don't have permission to delete this video",
        });
      }
      return video.destroy();
    })
    .then(() => {
      res.status(200).json({
        status: 1,
        message: "Video deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        data: err.message,
      });
    });
};

module.exports = { createVideo, getAllVideos, getVideoById, deleteVideo };
