const { database } = require("../database");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("User", "Admin"),
      defaultValue: "User",
    },
  },
  {
    sequelize: database,
    modelName: "User",
    tableName: "users",
  },
);

User.associate = (models) => {
  User.hasMany(models.Video, { foreignKey: "user_id" });
  User.hasMany(models.Annotation, { foreignKey: "user_id" });
  User.hasMany(models.Bookmark, { foreignKey: "user_id" });
};

module.exports = User;
