const { Cart, UserInfo } = require("../database/db");

module.exports = {
  setUserInfo(cartId, userInfo) {
    let savedInfo;
    return UserInfo.create(userInfo)
      .then((info) => {
        savedInfo = info;
        return Cart.findByPk(cartId);
      })
      .then((cart) => {
        cart.setUserInfo(savedInfo);
        return cart;
      })
      .catch((err) => {
        return err;
      });
  },
  getUserInfo(cartId) {
    return UserInfo.findOne({
      where: { cartId: cartId },
    });
  },
};
