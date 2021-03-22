const server = require("express").Router();
const userControllers = require("../../controllers/user.controller");
const cartControllers = require("../../controllers/cart.controller");
const orderLineControllers = require("../../controllers/orderLine.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware");

server.get("/", protectorOfRoute('admin'), (req, res) => {
  userControllers
    .getUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
});

server.get("/:idUser/cart", (req, res) => {
  const { idUser } = req.params;

  cartControllers
    .getProductOrder(idUser)
    .then((orders) => res.status(200).json(orders))
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.get("/:idUser/orders", (req, res) => {
  let { idUser } = req.params;

  orderLineControllers
    .getOrdersByUser(idUser)
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(400).json(err));
});

server.get("/limit/:limitCount", (req, res) => {
  let { limitCount } = req.params;

  userControllers
    .getLastUsers(limitCount)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
});

server.get("/total", protectorOfRoute('admin'), (req, res) => {
  userControllers
    .getTotalUsers()
    .then((total) => {
      res.status(200).json(total.count);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.get("/:id", (req, res) => {
  userControllers
    .getUserById(req.params.id)
    .then((user) => {
      res.status(200).json({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
