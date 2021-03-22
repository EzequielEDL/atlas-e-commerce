const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email",
        },
        notNull: {
          msg: "Email can't be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_virtual: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: "The password is not in range",
        },
        notNull: {
          msg: "The password can't be empty",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("guest", "admin"),
      defaultValue: "guest",
    },
    reset_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
