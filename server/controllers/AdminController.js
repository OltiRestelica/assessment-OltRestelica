const Video = require("../models/Video");
const User = require("../models/User");
const Annotation = require("../models/Annotation");
const Bookmark = require("../models/Bookmark");

const adminPanel = async (req, res) => {
  await Video.findAll({
    include: [
      {
        model: User,
        attributes: ["user_id", "name", "email"],
      },
      {
        model: Annotation,
        include: [
          {
            model: User,
            attributes: ["user_id", "name"],
          },
        ],
      },
      {
        model: Bookmark,
        include: [
          {
            model: User,
            attributes: ["user_id", "name"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        status: 1,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "Failed to fetch videos",
      });
    });
};

module.exports = adminPanel;
