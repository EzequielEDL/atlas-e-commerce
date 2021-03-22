const { Op } = require("sequelize");
const { Cart, Product, OrderLine, User } = require("../database/db.js");

module.exports = {
  getCartByFK(id) {
    return Cart.findOne({
      where: {
        userId: id,
        status: "onCart",
      },
    });
  },
  getProductOrder(idUser) {
    return Cart.findAll({
      where: {
        [Op.and]: [{ userId: parseInt(idUser) }, { status: "onCart" }],
      },
      include: [
        {
          model: Product,
        },
      ],
    });
  },
  findUser(userId) {
    return User.findByPk(userId).then((user) => {
      return user;
    });
  },
  setProductCart(idProduct, idCart) {
    let created;
    return Cart.findOne({
      where: { id: idCart },
    })
      .then((cart) => {
        created = cart;
        return Product.findOne({
          where: { id: idProduct },
        });
      })
      .then((product) => {
        created.addProducts(product);
      });
  },
  deleteCart(id) {
    return Cart.destroy({
      where: {
        [Op.and]: [{ userId: id }, { status: "onCart" }],
      },
      include: [
        {
          model: Product,
        },
      ],
      force: true,
    });
  },
  updateSatus(id, status) {
    return Cart.findOne({
      where: {
        userId: id,
      },
    }).then((cart) => {
      cart.status = status;
      return cart.save();
    });
  },
  handleCart(productId, userId) {
    let savedCart;
    return Cart.findOrCreate({
      where: { [Op.and]: [{ status: "onCart" }, { userId: userId }] },
    })
      .then((cart) => {
        savedCart = cart[0];
        return User.findOne({ where: { id: userId } });
      })
      .then((user) => {
        savedCart.setUser(user);
        return Product.findOne({ where: { id: productId } });
      })
      .then((product) => {
        savedProduct = product;
        savedCart.addProduct(product);

        /*const orderLineCreated = OrderLine.findOne({where: {cartId: savedCart.id}})*/

        return OrderLine.create({
          price: product.price,
          productId: product.id,
          cartId: savedCart.id,
        });
      })
      .then((orderLine) => {
        return { orderLine, savedProduct };
      });
  },

  handleCreateCart(user) {
    return Cart.findOne({
      where: {
        [Op.and]: [{ userId: user.id }, { status: "onCart" }],
      },
    })
      .then((cart) => {
        if (cart) return;
        else return Cart.create();
      })
      .then((cart) => {
        if (cart) {
          cart.setUser(user);
          return { msg: "Cart created successfuly", cart: cart };
        } else {
          return { msg: "User already have a cart with status onCart" };
        }
      })
      .catch((err) => {
        return err;
      });
  },
  handleStockOnCreateOrderLine(productId) {
    return Product.findByPk(productId);
  },
  handleFindOrderLine(productId, cartId, quantity) {
    let savedOrder;
    let scenario = "";
    return OrderLine.findOne({
      where: {
        [Op.and]: [{ productId: productId }, { cartId: cartId }],
      },
    })
      .then((order) => {
        if (!order) {
          scenario = "created";
          return OrderLine.create({ productId, cartId });
        } else {
          scenario = "updated";
          return order;
        }
      })
      .then((order) => {
        savedOrder = order;
        return Product.findByPk(productId);
      })
      .then((product) => {
        savedOrder.price = parseInt(product.price) * quantity;
        savedOrder.quantity = quantity;
        savedOrder.save();
        return { msg: `Order ${scenario} successfuly`, order: savedOrder };
      });
  },
  findProduct(productId) {
    return Product.findByPk(productId);
  },
  handleDeleteItem(cartId, productId) {
    return OrderLine.destroy({
      where: {
        [Op.and]: [{ cartId: cartId }, { productId: productId }],
      },
      force: true,
    });
  },
  handleAddOne(cartId, productId) {
    let savedProduct;
    return Product.findByPk(productId)
      .then((product) => {
        savedProduct = product;
        return OrderLine.findOne({
          where: {
            [Op.and]: [{ cartId: cartId }, { productId: productId }],
          },
        });
      })
      .then((order) => {
        if (order.quantity === savedProduct.stock || savedProduct.stock === 0)
          return { msg: "Product has no more stock available" };
        order.quantity = order.quantity + 1;
        order.price = order.quantity * savedProduct.price;
        order.save();
        return {
          msg: "Updated order quantity plus one successfuly",
          order: order,
        };
      });
  },
};
