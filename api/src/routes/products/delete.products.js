const server = require("express").Router();
const productControllers = require("../../controllers/products.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.delete("/:idProduct", protectorOfRoute('admin'), (req, res) => {
  let id = req.params.idProduct;

  productControllers
    .deleteProduct(id)
    .then(() => {
      res.status(200).json({ msg: "Product deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
