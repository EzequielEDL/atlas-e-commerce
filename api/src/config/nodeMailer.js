const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env;

module.exports = {
  transporter() {
    return nodemailer.createTransport({
      service: "gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: `${AUTH_EMAIL}`,
        pass: `${AUTH_PASS}`,
      },
    });
  },

  // setCodeSecurity(userEmail) {
  //   return User.findOne({
  //     where: {
  //       email: userEmail,
  //     },
  //   }).then((userRes) => {
  //     userRes.reset_code = crypto.randomBytes(3).toString('hex').toUpperCase();
  //     return userRes;
  //   })
  // },

};
