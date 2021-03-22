const server = require("express").Router();
const categoriesController = require("../../controllers/categories.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.delete("/category/:id", protectorOfRoute('admin'), (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) res.status(400).send({ msg: "Not valid ID" });

  categoriesController
    .deleteCategory(id)
    .then(() => {
      res.status(200).json({ msg: "Category deleted successfully" });
    })
    .catch((err) => res.status(400).json(err));
});

server.delete(
  "/:idProduct/category/:idCategory",
  protectorOfRoute('admin'),
  (req, res) => {
    let { idProduct, idCategory } = req.params;

    categoriesController
      .deleteCategoryFromProduct(idProduct, idCategory)
      .then(() => {
        res
          .status(200)
          .json({ msg: "Category deleted from product successfully" });
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = server;
