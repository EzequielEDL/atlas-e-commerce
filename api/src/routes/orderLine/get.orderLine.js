const server = require("express").Router();
const orderLineController = require("../../controllers/orderLine.controller");

server.get("/", (req, res) => {
  orderLineController
    .getOrders()
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;

  return orderLineController
    .getOrderById(id)
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

server.get("/limit/:limitCount", (req, res) => {
  const { limitCount } = req.params;

  return orderLineController
    .getLastOrders(limitCount)
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

server.get("/total", async (req, res) => {
  orderLineController
    .getTotalOrders()
    .then((total) => {
      res.status(200).json(total.count);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
