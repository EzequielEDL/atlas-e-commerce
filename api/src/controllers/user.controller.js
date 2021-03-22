const { User } = require("../database/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
  async create(user) {
    const userExist = await User.findOne({ where: { email: user.email } });
    if (userExist)
      return new Promise((resolve, reject) => {
        resolve("user exist");
      });
    return User.create(user);
  },
  login(email, password) {
    return User.findOne({ where: { email: email } }).then(async (user) => {
      if (user) {
        let result = await bcrypt.compare(password, user.password);
        if (result) {
          return { success: result, user };
        }
      }
    });
  },
  update(id, user) {
    return User.update(
      {
        ...user,
        password: bcrypt.hashSync(user.password_virtual, 10),
      },
      {
        where: { id: id },
      }
    );
  },
  getUsers() {
    return User.findAll();
  },
  getUserById(userId) {
    return User.findOne({
      where: { id: userId },
    });
  },
  getLastUsers(limitCount) {
    return User.findAll({
      limit: parseInt(limitCount),
      order: [["createdAt", "DESC"]],
    });
  },
  getTotalUsers() {
    return User.findAndCountAll();
  },
  promoteUser(id) {
    return User.update(
      {
        role: "admin",
      },
      {
        where: { id: id },
      }
    );
  },

  setCodeSecurity(userEmail) {
    return User.findOne({
      where: {
        email: userEmail,
      },
    }).then((userRes) => {
      userRes.reset_code = crypto.randomBytes(3).toString("hex").toUpperCase();
      userRes.save();
      return userRes;
    });
  },

  getVerifyCode(email, newPassword, code) {
    return User.findOne({
      where: {
        email: email,
        reset_code: code,
      },
    }).then((userRes) => {
      User.update(
        {
          ...userRes,
          password: bcrypt.hashSync(newPassword, 10),
        },
        {
          where: {
            id: userRes.id,
          },
        }
      );
    });
  },
};
