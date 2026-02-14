const { database } = require("../database");
const { DataTypes, Model } = require("sequelize");

class Bookmark extends Model {}
Bookmark.init(
  {
    bookmark_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "videos",
        key: "video_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    timestamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: database,
    modelName: "Bookmark",
    tableName: "bookmarks",
    indexes: [
      {
        fields: ["video_id", "timestamp"], // index for faster video-based queries
      },
    ],
  },
);

Bookmark.associate = (models) => {
  Bookmark.belongsTo(models.User, { foreignKey: "user_id" });
  Bookmark.belongsTo(models.Video, { foreignKey: "video_id" });
};

module.exports = Bookmark;
