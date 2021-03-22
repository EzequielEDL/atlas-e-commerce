const { Product, Categories } = require("../database/db");
const { Op } = require("sequelize");

module.exports = {
  searchProductByInputValue(inputValue) {
    return Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: "%" + inputValue + "%",
            },
          },
          {
            description: {
              [Op.iLike]: "%" + inputValue + "%",
            },
          },
        ],
      },
      include: [{ model: Categories, as: "categories" }],
    });
  },
  searchProductByInputId(inputId) {
    return Product.findOne({
      where: {
        id: parseInt(inputId),
      },
      include: [{ model: Categories, as: "categories" }],
    });
  },
  searchProductsByCategoryName(categoryName) {
    return Categories.findAll({
      where: {
        name: {
          [Op.iLike]: categoryName,
        },
      },
      include: [{ model: Product, as: "products" }],
    });
  },
};
