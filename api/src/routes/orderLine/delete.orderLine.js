const server = require("express").Router();
const cartController = require("../../controllers/cart.controller");
const orderLineController = require("../../controllers/orderLine.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.delete("/:idOrder", protectorOfRoute("admin"), (req, res) => {
  const { idOrder } = req.params;
  const { proId } = req.body;

  return orderLineController
    .deleteItem(idOrder, proId)
    .then(() => {
      res.status(200).json({ msg: "Item was deleted successfuly" });
    })
    .catch((err) => res.status(400).json(err));
});

server.delete("/:cartId/deleteitem", (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  cartController
    .handleDeleteItem(parseInt(cartId), parseInt(productId))
    .then((result) => {
      if (result === 0)
        res.status(400).json({ msg: "Product or cart didn't exist" });
      else if (result === 1)
        res.status(200).json({ msg: "Product deleted successfuly" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;