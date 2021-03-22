const server = require("express").Router();
const reviewController = require("../../controllers/review.controller");
const { Review } = require("../../database/db");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.put("/:idReview/review", (req, res) => {
  const { idReview } = req.params;
  const { score, description } = req.body;

  console.log(req.body);

  return reviewController
    .updateReview(score, description, idReview)
    .then((resReview) => {
      res.status(200).json(resReview);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = server;
