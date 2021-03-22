const { Op } = require("sequelize");
const { OrderLine, Cart, Product } = require("../database/db.js");

module.exports = {
  getOrders() {
    return Cart.findAll({
      include: {
        model: Product,
      },
    });
  },
  getOrdersInProcess() {
    return Cart.findAll({
      where: {
        status: "Process",
      },
      include: {
        model: Product,
      },
    });
  },
  getOrderById(idOrder) {
    return Cart.findOne({
      where: { id: idOrder },
      include: {
        model: Product,
      },
    });
  },
  getOrdersByUser(userId) {
    return Cart.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Product,
      },
    });
  },
  getOrder(cartId, productId) {
    return OrderLine.findOne({
      where: {
        [Op.and]: [{ cartId: cartId }, { productId: productId }],
      },
    });
  },
  createOrder(product, cart) {
    return OrderLine.findOrCreate({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
      defaults: {
        price: product.price,
      },
    }).then((res) => {
      console.log(res);
      return res;
    });
  },
  updateQuant(cart, proId, quantity) {
    let orderLine;
    return OrderLine.findOne({
      where: {
        [Op.and]: [{ cartId: cart.id }, { productId: proId }],
      },
    })
      .then((order) => {
        orderLine = order;
        orderLine.quantity = quantity;
        return orderLine.save();
      })
      .then(() => {
        orderLine.price = orderLine.quantity * orderLine.price;
        orderLine.save();
      });
  },

  updateQuantAndPrice(idCart, product) {
    return OrderLine.findOne({
      where: {
        [Op.and]: [{ cartId: idCart }, { productId: product.id }],
      },
    })
      .then((orderLine) => {
        orderLine.quantity += 1;
        return orderLine.save();
      })
      .then((order) => {
        order.price = order.quantity * product.price;
        order.save();
      });
  },

  updateQuantRemoveOne(idCart, product) {
    return OrderLine.findOne({
      where: {
        [Op.and]: [{ cartId: idCart }, { productId: product.id }],
      },
    })
      .then((orderLine) => {
        orderLine.quantity -= 1;
        return orderLine.save();
      })
      .then((order) => {
        order.price = order.quantity * product.price;
        order.save();
      });
  },

  getLastOrders(limitCount) {
    return Cart.findAll({
      limit: parseInt(limitCount),
      order: [["createdAt", "DESC"]],
    });
  },
  updateOrder(id, status) {
    return Cart.findByPk(id).then((order) => {
      order.status = status;
      order.save();
      return order;
    });
  },
  getTotalOrders() {
    return OrderLine.findAndCountAll();
  },

  emptyCart(id) {
    return OrderLine.destroy({
      where: {
        cartId: id,
      },
      force: true,
    });
  },

  deleteItem(idOrder, idProduct) {
    return OrderLine.destroy({
      where: {
        [Op.and]: [{ cartId: idOrder }, { productId: idProduct }],
      },
      force: true,
    });
  },
};
