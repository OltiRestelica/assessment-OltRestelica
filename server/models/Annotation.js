const { database } = require("../database");
const { DataTypes, Model } = require("sequelize");

class Annotation extends Model {}
Annotation.init(
  {
    annotation_id: {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: database,
    modelName: "Annotation",
    tableName: "annotations",
    indexes: [
      {
        fields: ["video_id", "timestamp"], // index for faster video-based queries
      },
    ],
  },
);

Annotation.associate = (models) => {
  Annotation.belongsTo(models.User, { foreignKey: "user_id" });
  Annotation.belongsTo(models.Video, { foreignKey: "video_id" });
};

module.exports = Annotation;
