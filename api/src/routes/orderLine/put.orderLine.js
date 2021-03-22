const server = require("express").Router();
const productController = require("../../controllers/products.controller");
const orderLineController = require("../../controllers/orderLine.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");
const cartController = require("../../controllers/cart.controller");

server.put("/:id", protectorOfRoute(), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  orderLineController
    .updateOrder(id, status)
    .then((order) => {
      res
        .status(200)
        .json({ msg: "Order was updated successfuly", order: order });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.put("/:idOrder/add", (req, res) => {
  const { idOrder } = req.params;
  const { proId } = req.body;

  return productController
    .getProductById(proId)
    .then((product) => {
      return orderLineController.updateQuantAndPrice(idOrder, product);
    })
    .then(() => {
      res.status(200).json({ msg: "added" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.put("/:idOrder/remove", (req, res) => {
  const { idOrder } = req.params;
  const { proId } = req.body;

  return productController
    .getProductById(proId)
    .then((product) => {
      return orderLineController.updateQuantRemoveOne(idOrder, product);
    })
    .then(() => {
      res.status(200).json({ msg: "removed" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.put("/:cartId/addone", (req, res) => {
  cartController
    .handleAddOne(parseInt(req.params.cartId), req.body.productId)
    .then((result) => {
      if (result.msg === "Product has no more stock available") {
        res.status(400).json({ msg: result.msg });
      } else if (result.msg === "Updated order quantity plus one successfuly") {
        res.status(200).json({ msg: result.msg, order: result.order });
      } else {
        res.status(400).json({ msg: "The product hasn't been updated" });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "Something went wrong", error: err });
    });
});

module.exports = server;
