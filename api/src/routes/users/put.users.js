const server = require("express").Router();
const userControllers = require("../../controllers/user.controller");
const cartController = require("../../controllers/cart.controller");
const orderLineController = require("../../controllers/orderLine.controller");

server.put("/:idUser/cart", (req, res) => {
  const { idUser } = req.params;
  const { quantity, proId } = req.body;

  return cartController
    .getProductOrder(idUser)
    .then((cart) => {
      orderLineController.updateQuant(cart[0], proId, quantity);
    })
    .then(() => {
      res.status(200).json({ msg: "Done" });
    })
    .catch((err) => res.status(400).json(err));
});

server.put("/:idUser/cart/status", (req, res) => {
  const { idUser } = req.params;
  const { status } = req.body;

  return cartController
    .updateSatus(idUser, status)
    .then(() => {
      res.status(200).json({ msg: "Status Changed Succesfuly" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.put("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = {
    email: req.body.email ? req.body.email.toString() : null,
    name: req.body.name ? req.body.name.toString() : null,
    lastname: req.body.lastname ? req.body.lastname.toString() : null,
    password_virtual: req.body.password_virtual
      ? req.body.password_virtual.toString()
      : null,
  };

  userControllers
    .update(userId, user)
    .then((user) => {
      console.log(user);
      res.status(200).json({ msg: "User updated successfuly" });
    })
    .catch((err) => {
      let error = err.errors[0].message || "undefined error";
      console.log(error);
      res.json({ err: error });
    });
});

server.put("/reset/code", (req, res) => {
  const { email, newPassword, code } = req.body;
  console.log(req.body);
  return userControllers
    .getVerifyCode(email, newPassword, code)
    .then((userRes) => {
      console.log(userRes);
      res.status(200).json({ msg: "Password was updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong", error: err });
    });
});

module.exports = server;
