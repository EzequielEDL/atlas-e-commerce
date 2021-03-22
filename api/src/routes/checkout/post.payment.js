const server = require("express").Router();
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

server.post("/process_payment", (req, res) => {
  const payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: "test_user_24255897@testuser.com",
      identification: {
        type: req.body.docType,
        number: req.body.docNumber,
      },
    },
  };

  mercadopago.payment
    .save(payment_data)
    .then((response) => {
      console.log(response);
      console.log(response.response.status);
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

module.exports = server;
