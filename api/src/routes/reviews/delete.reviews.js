const server = require("express").Router();
const reviewController = require("../../controllers/review.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.delete("/:idReview/review", (req, res) => {
  const { idReview } = req.params;

  return reviewController
    .deleteReview(idReview)
    .then(() => {
      res.status(200).json({ msg: "done" });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = server;
