const server = require("express").Router();
const userInfoController = require("../../controllers/userInfo.controller");

server.get("/search/:cartId", (req, res) => {
  const { cartId } = req.params;
  userInfoController
    .getUserInfo(cartId)
    .then((result) => {
      if (!result) res.status(200).json({ msg: "Info not found" });
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
