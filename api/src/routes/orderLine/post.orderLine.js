const server = require("express").Router();
const cartController = require("../../controllers/cart.controller");

server.post("/:cartId/handleitem", (req, res) => {
  const { productId, quantity } = req.body;

  cartController.handleStockOnCreateOrderLine(productId).then((product) => {
    if (!product) {
      res.status(400).json({ msg: "Product didn't exist" });
    } else if (product.stock === 0) {
      res
        .status(400)
        .json({ msg: "Product has no more stock available", product: product });
    } else {
      cartController
        .handleFindOrderLine(
          parseInt(productId),
          parseInt(req.params.cartId),
          parseInt(quantity)
        )
        .then((result) => {
          if (
            result.msg === "Order updated successfuly" ||
            result.msg === "Order created successfuly"
          ) {
            return res
              .status(200)
              .json({ msg: result.msg, order: result.order });
          } else {
            res.status(400).json({ msg: "Unknow error" });
          }
        })
        .catch((err) => {
          if (
            err.name === "SequelizeForeignKeyConstraintError" &&
            err.parent.detail ===
              `Key (cartId)=(${req.params.cartId}) is not present in table "carts".`
          ) {
            res.status(400).json({ msg: "Cart didn't exist" });
          } else {
            res.status(400).json(err);
          }
        });
    }
  });
});

module.exports = server;
