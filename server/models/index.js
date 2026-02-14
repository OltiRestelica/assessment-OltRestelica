const User = require("./User");
const Video = require("./Video");
const Annotation = require("./Annotation");
const Bookmark = require("./Bookmark");
const models = {
  User,
  Video,
  Annotation,
  Bookmark,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
