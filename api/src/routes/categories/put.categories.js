const server = require("express").Router();
const categoriesController = require("../../controllers/categories.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.put("/category/:id", protectorOfRoute('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  categoriesController
    .updateCategory(id, name, description)
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = server;
