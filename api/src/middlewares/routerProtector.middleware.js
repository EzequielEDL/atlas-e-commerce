const jwt = require("jsonwebtoken");

const protectorOfRoute = (role) => {
  return function (req, res, next) {
    if (!req.headers.authorization) return res.sendStatus(401);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "U!D04d02jR%@qmM6FNSg", (err, decode) => {
      if (err) return res.sendStatus(401);
      if (role) {
        if (decode.role !== role) {
          return res.sendStatus(401);
        }
      }
      return next();
    });
  };
};

module.exports = protectorOfRoute;

