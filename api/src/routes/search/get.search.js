const server = require("express").Router();
const searchController = require("../../controllers/search.controller");

server.get("/search", (req, res) => {
  const inputValue = req.query.value;

  searchController
    .searchProductByInputValue(inputValue)
    .then((findedProducts) => {
      res.status(200).json(findedProducts);
    })
    .catch((err) => res.status(400).json(err));
});

server.get("/search/:inputId", (req, res) => {
  let { inputId } = req.params;

  searchController
    .searchProductByInputId(inputId)
    .then((findedProduct) => {
      res.status(200).json(findedProduct);
    })
    .catch((err) => res.status(400).json(err));
});

server.get("/search/category/:categoryName", (req, res) => {
  let categoryName = req.params.categoryName;

  searchController
    .searchProductsByCategoryName(categoryName)
    .then((findedProducts) => {
      console.log(findedProducts[0].dataValues.products);
      res.status(200).json(findedProducts[0].dataValues.products);
    })
    .catch((err) => {
      res.satus(400).json(err);
    });
});

module.exports = server;
