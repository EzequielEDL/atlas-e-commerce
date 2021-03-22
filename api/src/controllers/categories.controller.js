const { Product, Categories } = require("../database/db.js");

module.exports = {
  getCategoryById(id) {
    return Categories.findByPk(id);
  },
  getCategories() {
    return Categories.findAll();
  },
  getCategoryByName(category) {
    return Categories.findOne({
      where: { name: category },
    });
  },
  postCategory(category) {
    return Categories.create(category).then((category) => {
      return category;
    });
  },
  updateCategory(id, name, description) {
    return Categories.update(
      {
        name: name,
        description: description,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
  deleteCategory(id) {
    const deletedCategory = [];

    Categories.findOne({ where: { id: id } }).then((category) => {
      return deletedCategory.push(category);
    });

    return Categories.destroy({
      where: {
        id: id,
      },
      force: true,
    }).then(() => {
      return deletedCategory[0];
    });
  },
  addCategoryToProduct(idProduct, idCategory) {
    let product;

    return Product.findOne({
      where: {
        id: parseInt(idProduct),
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
      ],
    })
      .then((findProduct) => {
        product = findProduct;

        return Categories.findOne({
          where: {
            id: parseInt(idCategory),
          },
        });
      })
      .then((addedCategory) => {
        const productCategories = product.getDataValue("categories");
        productCategories.push(addedCategory);
        product.setCategories(productCategories);
      });
    //   .then(() => {
    // 	  return this.getCategories()
    //   })
  },
  deleteCategoryFromProduct(idProduct, idCategory) {
    let product;

    return Product.findOne({
      where: {
        id: parseInt(idProduct),
      },
      include: [{ model: Categories, as: "categories" }],
    })
      .then((findProduct) => {
        product = findProduct;
        return product.getCategories();
      })
      .then((findCategories) => {
        const filterCategories = findCategories.filter(
          (c) => c.id != parseInt(idCategory)
        );
        product.setCategories(filterCategories);
      });
  },
  getTotalCategories() {
    return Categories.findAndCountAll();
  },
  addCategories(idProduct, categories) {
    console.log(idProduct, categories);
    return Product.findOne({
      where: {
        id: parseInt(idProduct),
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
      ],
    }).then((product) => {
      product.setCategories(categories);
    });
  },
};
