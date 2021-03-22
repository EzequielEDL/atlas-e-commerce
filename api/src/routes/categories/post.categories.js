const server = require("express").Router();
const categoriesController = require("../../controllers/categories.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.post("/category", protectorOfRoute('admin'), (req, res, next) => {
  const { name, description } = req.body;

  categoriesController
    .postCategory({ name, description })
    .then((createdCategory) => {
      res.status(200).json(createdCategory);
    })
    .catch((err) => res.status(400).json(err));
});

server.post(
  "/:idProduct/category/:idCategory",
  protectorOfRoute('admin'),
  (req, res) => {
    const { idProduct, idCategory } = req.params;

    categoriesController
      .addCategoryToProduct(idProduct, idCategory)
      .then(() => {
        res.status(200).json({ msg: "Category added to product successfuly" });
      });
  }
);

server.post("/categories/:idProduct", protectorOfRoute('admin'), (req, res) => {
  const { idProduct } = req.params;
  const categories = req.body;
  console.log(categories);

  categoriesController
    .addCategories(idProduct, categories)
    .then(() => {
      res.status(200).json({ msg: "Categories added to product successfuly" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
