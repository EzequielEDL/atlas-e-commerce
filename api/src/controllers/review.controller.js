const { Product, User, Review } = require("../database/db");
const userController = require("../controllers/user.controller");
const productController = require("../controllers/products.controller");

module.exports = {
  createReview(review, idUser, proId) {
    let data;
    return Review.create({
      score: review.score,
      description: review.description,
    })
      .then((res) => {
        data = res;
        return userController.getUserById(idUser);
      })
      .then((user) => {
        data.setUser(user);
        return productController.getProductById(proId);
      })
      .then((product) => {
        return data.setProduct(product);
      });
  },
  getReview(proId) {
    return Review.findAll({
      where: {
        productId: proId,
      },
    });
  },
  updateReview(score, description, idReview) {
    return Review.update(
      {
        score: score,
        description: description,
      },
      {
        where: {
          id: idReview,
        },
      }
    );
  },
  deleteReview(idReview) {
    return Review.destroy({
      where: {
        id: idReview,
      },
      force: true,
    });
  },
};

