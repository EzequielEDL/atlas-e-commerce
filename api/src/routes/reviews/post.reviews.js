const server = require("express").Router();
const { User, Product, Review } = require("../../database/db");
const reviewController = require("../../controllers/review.controller");
const userController = require("../../controllers/user.controller");
const productController = require("../../controllers/products.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.post("/:proId/review", (req, res) => {
  const { proId } = req.params;
  const { score, description, idUser } = req.body;

  const review = {
    score: score,
    description: description,
  };

  return reviewController
    .createReview(review, idUser, proId)
    .then((ret) => {
      res.status(200).json({ msg: "Done" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;

