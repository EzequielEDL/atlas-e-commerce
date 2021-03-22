const server = require("express").Router();
const categoriesController = require("../../controllers/categories.controller");

server.get("/", (req, res, next) => {
  categoriesController
    .getCategories()
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(400).json(err));
});

server.get("/total", async (req, res) => {
  categoriesController
    .getTotalCategories()
    .then((total) => {
      res.status(200).json(total.count);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
