const server = require("express").Router();
const productController = require("../../controllers/products.controller");
const protectorOfRoutes = require('../../middlewares/routerProtector.middleware');

server.get("/", (req, res) => {
  productController
    .getProducts()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.get("/total", async (req, res) => {
  productController
    .getTotalProducts()
    .then((total) => {
      res.status(200).json(total.count);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
