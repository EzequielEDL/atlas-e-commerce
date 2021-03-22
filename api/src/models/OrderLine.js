const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("orderLine", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  });
};

