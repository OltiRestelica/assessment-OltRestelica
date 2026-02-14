const { database } = require("../database");
const { DataTypes, Model } = require("sequelize");

class Video extends Model {}
Video.init(
  {
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "Video",
    tableName: "videos",
    indexes: [
      {
        fields: ["user_id"],
      },
    ],
  },
);

Video.associate = (models) => {
  Video.belongsTo(models.User, { foreignKey: "user_id" }); // uploader
  Video.hasMany(models.Annotation, { foreignKey: "video_id" });
  Video.hasMany(models.Bookmark, { foreignKey: "video_id" });
};

module.exports = Video;
