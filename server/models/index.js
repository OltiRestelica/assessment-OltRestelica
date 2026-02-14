const User = require("./User");

const models = {
  User,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
