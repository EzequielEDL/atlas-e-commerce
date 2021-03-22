const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

const cors = require("./middlewares/cors.middleware");
const multer = require("./middlewares/multer.middleware");
const statics = require("./middlewares/statics.middleware");
const passport = require("./middlewares/passport.middleware").server;

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser("clave secreta"));
server.use(
  session({ secret: "clave secreta", resave: true, saveUninitialized: true })
);

server.use(morgan("dev"));
server.use(cors);
server.use(multer);
server.use(passport);

server.use("/products/images", statics);
server.use("/images", statics);

server.use("/", routes);

module.exports = server;
