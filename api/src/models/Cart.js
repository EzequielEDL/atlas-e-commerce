const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("cart", {
    status: {
      type: DataTypes.ENUM(
        "onCart",
        "Create",
        "Process",
        "Canceled",
        "Success"
      ),
      defaultValue: "onCart",
    },
  });
};
