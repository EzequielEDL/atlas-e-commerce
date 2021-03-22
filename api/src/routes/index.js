const express = require("express");
const router = express.Router();
const session = require("express-session");
// routes categories
const getCategories = require("./categories/get.categories.js");
const putCategories = require("./categories/put.categories.js");
const postCategories = require("./categories/post.categories.js");
const deleteCategories = require("./categories/delete.categories.js");

// use categories
router.use("/categories", getCategories);
router.use("/products", putCategories);
router.use("/products", postCategories);
router.use("/products", deleteCategories);

// router products
const getProducts = require("./products/get.products");
const putProducts = require("./products/put.products");
const postProducts = require("./products/post.products");
const deleteProducts = require("./products/delete.products");

// use products
router.use("/products", getProducts);
router.use("/products", putProducts);
router.use("/products", postProducts);
router.use("/products", deleteProducts);

//router reviews
const getReviews = require("./reviews/get.reviews");
const putReviews = require("./reviews/put.reviews");
const postReviews = require("./reviews/post.reviews");
const deleteReviews = require("./reviews/delete.reviews");

//use reviews
router.use("/products", getReviews);
router.use("/products", putReviews);
router.use("/products", postReviews);
router.use("/products", deleteReviews);

//router Order_Line

const getOrderLine = require("./orderLine/get.orderLine");
const putOrderLine = require("./orderLine/put.orderLine");
const postOrderLine = require("./orderLine/post.orderLine");
const deleteOrderLine = require("./orderLine/delete.orderLine");

// use orderLine
router.use("/cart", getOrderLine);
router.use("/cart", putOrderLine);
router.use("/cart", postOrderLine);
router.use("/cart", deleteOrderLine);

// router user
const getUser = require("./users/get.users");
const postUser = require("./users/post.users");
const deleteUser = require("./users/delete.users");
const putUser = require("./users/put.users");

// use user
router.use("/users", getUser);
router.use("/users", postUser);
router.use("/users", deleteUser);
router.use("/users", putUser);

const search = require("./search/get.search");
const auth = require("./auth/get.auth");

router.use("/products", search);
router.use("/auth", auth);

const postUserInfo = require("./checkout/post.userInfo");
const getUserInfo = require("./checkout/get.userInfo");
const payment = require("./checkout/post.payment");

router.use("/userinfo", postUserInfo);
router.use("/userinfo", getUserInfo);
router.use("/", payment);

module.exports = router;
