const nodemailer = require("nodemailer");
const server = require("express").Router();
const { Op } = require("sequelize");
const { Cart, Product, OrderLine, User } = require("../../database/db");
const userControllers = require("../../controllers/user.controller");
const cartController = require("../../controllers/cart.controller");
const productController = require("../../controllers/products.controller");
const jwt = require("jsonwebtoken");
const orderLineController = require("../../controllers/orderLine.controller");
const passport = require("../../middlewares/passport.middleware.js").passport;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "252397862705-ske39b9h6sbcfhst45llmp0glait6i52.apps.googleusercontent.com",
  "oGeyFV939xcFeccYG5fAmra"
);
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");

server.post("/", (req, res) => {
  const user = {
    email: req.body.email ? req.body.email.toString() : null,
    name: req.body.name ? req.body.name.toString() : null,
    password_virtual: req.body.password_virtual
      ? req.body.password_virtual.toString()
      : null,
  };

  userControllers
    .create(user)
    .then((user) => {
      if (user === "user exist") {
        return res.status(200).json({ msg: "Email already exist" });
      }
      res
        .status(200)
        .json({ msg: "User created successfuly", userId: user.id });
    })
    .catch((err) => {
      res.json(err);
    });
});

server.post(
  "/login",
  function (req, res, next) {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) return next(err);
        if (!user) return next(info);
        req.logIn(user, { session: false }, function (err) {
          if (err) return next(err);
          const token = jwt.sign(
            {
              id: user.id,
              role: user.role,
            },
            "U!D04d02jR%@qmM6FNSg",
            { expiresIn: "5d" }
          );
          const dataUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
          const data = { msg: "Login successful", user: dataUser, token };
          return res.status(200).json(data);
        });
      }
    )(req, res, next);
  },
  function (err, req, res, next) {
    if (err) {
      res.status(200).json(err);
    }
  }
);

server.post("/login-google", (req, res) => {
  const idToken = req.body.tokenId;
  client
    .verifyIdToken({
      idToken,
      audience:
        "252397862705-ske39b9h6sbcfhst45llmp0glait6i52.apps.googleusercontent.com",
    })
    .then((response) => {
      if (response.payload) {
        const dataUserGoogle = response.payload;
        User.findOne({ where: { email: dataUserGoogle.email } }).then(
          (user) => {
            if (user) {
              const token = jwt.sign(
                {
                  id: user.id,
                  role: user.role,
                },
                "U!D04d02jR%@qmM6FNSg",
                { expiresIn: "5d" }
              );
              const dataUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              };
              const data = { msg: "Login successful", user: dataUser, token };
              return res.status(200).json(data);
            } else {
              const newUser = {
                email: dataUserGoogle.email,
                name: dataUserGoogle.name,
                password_virtual: `${Date.now()}`,
              };
              User.create(newUser).then((user) => {
                if (user) {
                  const token = jwt.sign(
                    {
                      id: user.id,
                      role: user.role,
                    },
                    "U!D04d02jR%@qmM6FNSg",
                    { expiresIn: "5d" }
                  );
                  const dataUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                  };
                  const data = {
                    msg: "Login successful",
                    user: dataUser,
                    token,
                  };
                  return res.status(200).json(data);
                }
              });
            }
          }
        );
      }
    });
});

server.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.status(200).json({ msg: "logout successful" });
  }
  res.status(200).json({ msg: "no authenticated user" });
});

server.post("/:userId/cart", (req, res) => {
  let savedUser;
  cartController
    .findUser(parseInt(req.params.userId))
    .then((user) => {
      savedUser = user;
    })
    .then(() => {
      if (!savedUser) {
        return;
      }
      return true;
    })
    .then((exist) => {
      if (exist) return cartController.handleCreateCart(savedUser);
      else savedUser = false;
    })
    .then((result) => {
      if (result && result.msg === "Cart created successfuly") {
        res.status(200).json({ msg: result.msg, cart: result.cart });
      } else if (
        result &&
        result.msg === "User already have a cart with status onCart"
      ) {
        res.status(400).json({ msg: result.msg });
      } else if (!savedUser) {
        res.status(400).json({ msg: "User didn't exist" });
      } else {
        re.status(400).json({ msg: "Something went wrong" });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "Something went wrong", err });
    });
});

server.post("/auth/promote/:id", protectorOfRoute('admin'), (req, res) => {
  userControllers
    .promoteUser(parseInt(req.params.id))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.post("/reset", (req, res) => {
  const { email } = req.body;
  const { AUTH_EMAIL, AUTH_PASS } = process.env;
  let transporter = nodemailer.createTransport({
    service: "gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${AUTH_EMAIL}`,
      pass: `${AUTH_PASS}`,
    },
  });

  userControllers
    .setCodeSecurity(email)
    .then((userRes) => {
      setTimeout(() => {
        userRes.reset_code = null;
        userRes.save();
      }, 600000);

      const data = {
        from: "Atlas - shop <atlasshop935@gmail.com>",
        to: `${userRes.email}`,
        subject: "Reset password",
        text: `Here you have your reset password code: ${userRes.reset_code}. Please click on the following link to change the password: http://localhost:8000/reset-password, this code expires in 10 minutes, run!`,
      };

      transporter.sendMail(data, (err, info) => {
        if (!err) {
          res.status(200).json({ msg: "Reset code sent" });
        } else {
          res.status(500).json({ msg: "Invalid email" });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: `${err}` });
    });
});

module.exports = server;
