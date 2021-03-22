const server = require("express").Router();
const reviewController = require("../../controllers/review.controller");
const { Review, Product } = require("../../database/db");

server.get("/:proId/review", (req, res) => {
  const { proId } = req.params;

  return reviewController
    .getReview(proId)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = server;
