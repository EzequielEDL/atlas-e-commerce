const server = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../../database/db");

server.get("/me", (req, res) => {
  if (!req.headers.authorization) res.sendStatus(401);
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "U!D04d02jR%@qmM6FNSg", (err, decode) => {
    if (err) res.sendStatus(401);
    else {
      User.findByPk(decode.id)
        .then((user) => {
          if (user) {
            const dataUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
            if (dataUser.role === decode.role) res.status(200).json(dataUser);
            else res.sendStatus(401);
          } else res.sendStatus(401);
        })
        .catch(() => {
          res.sendStatus(401);
        });
    }
  });
});

module.exports = server;

