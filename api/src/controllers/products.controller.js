const { Product, Categories, OrderLine } = require("../database/db.js");

module.exports = {
  getProductById(id) {
    return Product.findByPk(id);
  },
  getByIdOrder(id) {
    product.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: OrderLine,
        },
      ],
    });
  },
  getProductByName(product) {
    return Product.findOne({
      where: { name: product },
    });
  },
  getProducts() {
    return Product.findAll({
      include: [
        {
          model: Categories,
          as: "categories",
        },
      ],
    });
  },
  createProduct(product) {
    return Product.create(product).then((res) => res);
  },
  addImage(id, imageUrl) {
    return Product.findOne({where: { id: id }})
      .then(product => {
        let images = product.images;
        images.push(imageUrl)
        return Product.update({images: images}, {
          where: { id: id }
        })
      })
  },
  deleteProduct(id) {
    return Product.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  },
  updateProduct(id, product) {
    return Product.update(product, {
      where: {
        id: parseInt(id),
      },
    });
  },
  getTotalProducts() {
    return Product.findAndCountAll();
  },
  handleUpdateStock(productId, buyedQuantity) {
    return Product.findOne({
      where: {
        id: productId,
      },
    }).then((product) => {
      if (
        product.stock >= buyedQuantity &&
        product.stock > 0 &&
        buyedQuantity > 0
      ) {
        product.stock = product.stock - buyedQuantity;
        product.save();
        return { msg: "Product stock updated successfuly", product };
      } else if (buyedQuantity < 0) {
        return { msg: "Buyed quantity can't be a negative number" };
      } else {
        return {
          msg: "Buyed quantity is not in the proper format",
          stock: product.stock,
          productId: product.id,
        };
      }
    });
  },
};
