const server = require("express").Router();
const { User, Cart } = require("../../database/db");
const cartController = require("../../controllers/cart.controller");
const orderController = require("../../controllers/orderLine.controller");
const userController = require("../../controllers/user.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.delete("/:idUser/cart", (req, res) => {
  const { idUser } = req.params;

  return cartController
    .getCartByFK(idUser)
    .then((cart) => {
      orderController.emptyCart(cart.id);
    })
    .then(() => {
      res.status(200).json({ msg: "All orders were deleted successfully" });
    })
    .catch((err) => res.status(400).json(err));
});

server.delete("/delete/:idUser", (req, res) => {
  const { idUser } = req.params;
  User.destroy({ where: { id: idUser } })
    .then((response) => {
      if (response) {
        res.status(200).json({ msg: "User deleted" });
      } else {
        res.status(200).json({ msg: "Invalid id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Deleting user failed" });
    });
});

server.delete("/delete", protectorOfRoute('admin'), (req, res) => {
  if (!req.body.email) res.status(200).json({ msg: "Email void" });
  if (!req.body.password_virtual)
    res.status(200).json({ msg: "Password void" });
  userController
    .login(req.body.email, req.body.password_virtual)
    .then((result) => {
      if (result.success) {
        User.destroy({ where: { id: result.user.id } })
          .then((response) => {
            if (response) {
              req.logout();
              res.status(200).json({ msg: "User deleted" });
            }
          })
          .catch((err) => {
            res.status(500).json({ msg: "Deleting user failed" });
          });
      } else {
        res.status(200).json({ msg: "Email or password incorrect" });
      }
    });
});

module.exports = server;
