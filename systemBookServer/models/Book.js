const sequelize = require("./db");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define(
  "Book",
  {
    BookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.STRING,
    }
  },
  {
    paranoid: true,
  }
);
