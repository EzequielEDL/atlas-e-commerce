const server = require("express").Router();
const userInfoController = require("../../controllers/userInfo.controller");
require("dotenv").config();
const nodemailer = require("nodemailer");

server.post("/:cartId", (req, res) => {
  const { country, state, city, street, number, postalCode, email } = req.body;
  const { cartId } = req.params;

  const userInfo = {
    country: country,
    state: state,
    city: city,
    street: street,
    number: parseInt(number),
    postalCode: parseInt(postalCode),
    email: email,
  };

  userInfoController
    .setUserInfo(cartId, userInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

server.post("/notification/sendemail", (req, res) => {
  const { totalPrice, name, userInfo } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTH_EMAIL}`,
      pass: `${process.env.AUTH_PASS}`,
    },
  });

  let infoEmail = {
    from: "Atlas - shop",
    to: `${userInfo.email}`,
    subject: "ATLAS - Payment Success",
    html: `
<body style="color:black;text-align:center; background-color: #0088c7; padding: 50px ">

    <img src="https://i.ibb.co/mRF4R4Q/logo512.png" alt="logo512" width="100px" height="100px" border="0">
    <div class="">
<h1>We have received your payment, <b>${name}</b></h1>
<p>
I just wanted to drop you a quick note to let you know that we have received your recent payment in respect of ATLAS SHOP. Thank you very much. We really appreciate it.
</p>
<h3>Your Shiping Information</h3>
<p><b>Total Price: </b> ${totalPrice}</p>
<p><b>Country</b>: ${userInfo.country}</p>
<p><b>State: </b> ${userInfo.state}</p>
<p><b>City: </b> ${userInfo.city}</p>
<p><b>Street: </b> ${userInfo.street}</p>
<p><b>Number: </b> ${userInfo.number}</p>
<p><b>Postal Code: </b> ${userInfo.postalCode}</p>
<p>¿You wanna still buy our products from Atlas? <a href="https://3000:localhost/" style="color: white;">Yes, i want to shop more!</a></p>

    </div>

</body>

    `,
  };

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(infoEmail, (err, info) => {
    if (!err) {
      console.log(info);
      res.status(200).json(info);
    } else {
      console.log(err);
      res.status(400).json(err);
    }
  });
});

module.exports = server;
