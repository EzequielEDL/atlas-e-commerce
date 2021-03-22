import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CustomTextField } from "../../User/styles";
import { submitPayment } from "../../../controllers/checkout";

import useStyles from "./styles";

const PaymentInfo = ({ setState, handleSuccess, handleError, totalPrice }) => {
  const [values, setValues] = useState({
    documentNumber: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    securityCode: "",
  });

  const [issuer, setIssuer] = useState("");
  const [allIssuers, setAllIssuers] = useState([]);
  const [payerCosts, setPayerCosts] = useState([]);
  const [installmentState, setInstallmentState] = useState("");
  const [submit, setSubmit] = useState(false);
  const [cardType, setCardType] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleCardNumChange = (e) => {
    if (e.target.value.length > 19) return;
    if (
      e.target.value.length > 0 &&
      isNaN(parseInt(e.target.value[e.target.value.length - 1]))
    )
      return;

    setValues({
      ...values,
      cardNumber: e.target.value,
    });

    if (e.target.value.length >= 6) {
      let bin = e.target.value.substring(0, 6);
      window.Mercadopago.getPaymentMethod(
        {
          bin: bin,
        },
        setPaymentMethod
      );
      console.log(cardType);
    }
  };

  const handleDocNumChange = (e) => {
    if (e.target.value.length > 10) return;
    if (e.target.value.length > 0 && isNaN(parseInt(e.target.value))) return;
    setValues({
      ...values,
      documentNumber: e.target.value,
    });
  };

  const handleHolderNameChange = (e) => {
    setValues({
      ...values,
      cardHolderName: e.target.value.toUpperCase(),
    });
  };

  const handleExpMonthChange = (e) => {
    if (e.target.value.length > 2) return;
    if (e.target.value.length > 0 && isNaN(parseInt(e.target.value))) return;
    setValues({
      ...values,
      cardExpirationMonth: e.target.value,
    });
  };

  const handleExpYearChange = (e) => {
    if (e.target.value.length > 2) return;
    if (e.target.value.length > 0 && isNaN(parseInt(e.target.value))) return;
    setValues({
      ...values,
      cardExpirationYear: e.target.value,
    });
  };

  const handleSecCodeChange = (e) => {
    if (
      (e.target.value.length > 3 && cardType !== "amex") ||
      (e.target.value.length > 4 && cardType === "amex")
    )
      return;
    if (e.target.value.length > 0 && isNaN(parseInt(e.target.value))) return;
    setValues({
      ...values,
      securityCode: e.target.value,
    });
  };

  useEffect(() => {
    window.Mercadopago.setPublishableKey(process.env.REACT_APP_PUBLIC_KEY);
    window.Mercadopago.getIdentificationTypes();
  }, []);

  const setPaymentMethod = (status, response) => {
    if (status === 200) {
      setCardType(response[0].id);
      document.getElementById("paymentMethodId").value = response[0].id;
      getIssuers(response[0].id);
    } else {
      /*alert(`payment method info error: ${response}`);*/
      console.log(response);
    }
  };

  /*const handleChange = (e) => {
    let cardNumber = document.getElementById("cardNumber").value;

    if (cardNumber.length >= 6) {
      let bin = e.target.value.substring(0, 6);
      window.Mercadopago.getPaymentMethod(
        {
          bin: bin,
        },
        setPaymentMethod
      );
    }
  };*/

  const handleIssuerChange = (e) => {
    setIssuer(e.target.value);
  };

  const handleInstallmentChange = (e) => {
    setInstallmentState(e.target.value);
  };

  const getIssuers = (paymentMethodId) => {
    window.Mercadopago.getIssuers(
      paymentMethodId,
      /*setIssuers*/
      setIssuerMaterial
    );
  };

  const setIssuerMaterial = (status, response) => {
    if (status === 200) {
      setAllIssuers(response);
      getInstallments(
        document.getElementById("paymentMethodId").value,
        document.getElementById("transactionAmount").value,
        issuer
      );
    } else {
      /*alert(`issuers method info error: ${response}`);*/
      console.log(response);
    }
  };

  /*const setIssuers = (status, response) => {
    if (status === 200) {
      let issuerSelect = document.getElementById("issuer");
      response.forEach((issuer) => {
        let opt = document.createElement("option");
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });

      getInstallments(
        document.getElementById("paymentMethodId").value,
        document.getElementById("transactionAmount").value,
        issuerSelect.value
      );
    } else {
      alert(`issuers method info error: ${response}`);
    }
  };*/

  const getInstallments = (paymentMethodId, transactionAmount, issuerId) => {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: paymentMethodId,
        amount: parseFloat(transactionAmount),
        issuer_id: parseInt(issuerId),
      },
      /**setInstallments**/ setInstallmentsMaterial
    );
  };

  const setInstallmentsMaterial = (status, response) => {
    if (status === 200) {
      setPayerCosts(response[0].payer_costs);
    } else {
      /*alert(`installments method info error: ${response}`);*/
      console.log(response);
    }
  };

  /*const setInstallments = (status, response) => {
    if (status === 200) {
      response[0].payer_costs.forEach((payerCost) => {
        let opt = document.createElement("option");
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        document.getElementById("installments").appendChild(opt);
      });
    } else {
      alert(`installments method info error: ${response}`);
    }
  };*/

  const getCardToken = (e) => {
    e.preventDefault();
    handleButtonDisabled();
    if (!submit) {
      let $form = document.getElementById("paymentForm");

      let docNumber = document.createElement("input");
      docNumber.value = values.documentNumber;
      docNumber.setAttribute("type", "hidden");
      docNumber.setAttribute("name", "docNumber");
      docNumber.setAttribute("id", "docNumber");
      docNumber.setAttribute("data-checkout", "docNumber");
      $form.appendChild(docNumber);

      let cardHolderName = document.createElement("input");
      cardHolderName.value = values.cardHolderName;
      cardHolderName.setAttribute("type", "hidden");
      cardHolderName.setAttribute("data-checkout", "cardholderName");
      $form.appendChild(cardHolderName);

      let cardNumber = document.createElement("input");
      cardNumber.value = values.cardNumber;
      cardNumber.setAttribute("type", "hidden");
      cardNumber.setAttribute("data-checkout", "cardNumber");
      $form.appendChild(cardNumber);

      let issuerElement = document.createElement("input");
      issuerElement.setAttribute("type", "hidden");
      issuerElement.value = issuer;
      $form.appendChild(issuerElement);

      let expirationMonth = document.createElement("input");
      expirationMonth.value = values.cardExpirationMonth;
      expirationMonth.setAttribute("type", "hidden");
      expirationMonth.setAttribute("data-checkout", "cardExpirationMonth");
      $form.appendChild(expirationMonth);

      let expirationYear = document.createElement("input");
      expirationYear.value = values.cardExpirationYear;
      expirationYear.setAttribute("type", "hidden");
      expirationYear.setAttribute("data-checkout", "cardExpirationYear");
      $form.appendChild(expirationYear);

      let securityCode = document.createElement("input");
      securityCode.value = values.securityCode;
      securityCode.setAttribute("type", "hidden");
      securityCode.setAttribute("data-checkout", "securityCode");
      $form.appendChild(securityCode);

      let installmentElement = document.createElement("input");
      installmentElement.value = installmentState;
      installmentElement.setAttribute("type", "hidden");
      installmentElement.setAttribute("name", "installments");
      installmentElement.setAttribute("id", "installments");
      $form.appendChild(installmentElement);

      window.Mercadopago.createToken($form, setCardTokenAndPay);
      return false;
    }
  };

  const setCardTokenAndPay = (status, response) => {
    if (status === 200 || status === 201) {
      let form = document.getElementById("paymentForm");
      let card = document.createElement("input");
      card.setAttribute("name", "token");
      card.setAttribute("type", "hidden");
      card.setAttribute("value", response.id);
      form.appendChild(card);

      const transactionAmount = document.getElementById("transactionAmount")
        .value;
      const installmentsValue = document.getElementById("installments").value;
      const paymentMethodId = document.getElementById("paymentMethodId").value;
      const issuer_id = document.getElementById("issuer").value;
      const docType = document.getElementById("docType").value;
      const docNumber = document.getElementById("docNumber").value;

      setSubmit(true);

      const formData = {
        transactionAmount,
        token: response.id,
        installments: parseInt(installmentsValue),
        paymentMethodId,
        issuer: issuer_id,
        docType,
        docNumber,
      };

      submitPayment(formData)
        .then((response) => {
          console.log(response);
          if (response.status === "approved") {
            handleSuccess();
          } else handleError(response);
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
        });
    } else {
      /*alert("Verify filled data!\n" + JSON.stringify(response, null, 4));*/
      console.log(response);
    }
  };

  const handleButtonDisabled = () => {
    setButtonDisabled(true);
  };

  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" xs={12} className={classes.container}>
        <Grid container alignItem="center" justify="center" xs={4} xl={3}>
          <Grid xs={12}>
            <Button
              className={classes.backButton}
              variant="outlined"
              onClick={() => setState(false)}
            >
              <ArrowBackIcon />
              GO BACK
            </Button>
          </Grid>
          <Typography variant="h6" className={classes.title}>
            Payment Information
          </Typography>
          <Grid container xs={12} alignItem="center" justify="center">
            <form
              action="submit"
              id="paymentForm"
              onSubmit={getCardToken}
              className={classes.form}
            >
              <InputLabel className={classes.inputLabel}>
                Document Type
              </InputLabel>
              <select
                id="docType"
                name="docType"
                data-checkout="docType"
                type="text"
                className={classes.docType}
              ></select>
              <InputLabel className={classes.inputLabel}>
                Document Number
              </InputLabel>
              <CustomTextField
                variant="outlined"
                size="small"
                value={values.documentNumber}
                onChange={handleDocNumChange}
                className={classes.textField}
              />
              <InputLabel className={classes.inputLabel}>
                Card Holder Name
              </InputLabel>
              <CustomTextField
                variant="outlined"
                size="small"
                value={values.cardHolderName}
                onChange={handleHolderNameChange}
                className={classes.textField}
              />
              <InputLabel className={classes.inputLabel}>
                Card Number
              </InputLabel>
              <CustomTextField
                variant="outlined"
                size="small"
                value={values.cardNumber}
                onChange={handleCardNumChange}
                className={classes.textField}
              />
              <Grid container>
                <Grid item xs={7}>
                  <InputLabel className={classes.inputLabel}>
                    Expiration Date
                  </InputLabel>
                  <CustomTextField
                    variant="outlined"
                    size="small"
                    placeholder="MM"
                    value={values.cardExpirationMonth}
                    onChange={handleExpMonthChange}
                    className={classes.textFieldExpirationDate}
                  />
                  <CustomTextField
                    variant="outlined"
                    size="small"
                    placeholder="YY"
                    value={values.cardExpirationYear}
                    onChange={handleExpYearChange}
                    className={classes.textFieldExpirationDate}
                  />
                </Grid>
                <Grid item xs={5}>
                  <InputLabel className={classes.inputLabel}>
                    Security Code
                  </InputLabel>
                  <CustomTextField
                    variant="outlined"
                    size="small"
                    placeholder={cardType === "amex" ? "1234" : "123"}
                    value={values.securityCode}
                    onChange={handleSecCodeChange}
                    className={classes.textFieldSecurityCode}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.inputLabel}
                    id="issuer-input-label"
                  >
                    Select Issuer
                  </InputLabel>
                  <Select
                    labelId="issuer-input-label"
                    id="issuer"
                    name="issuer"
                    value={issuer}
                    onChange={handleIssuerChange}
                    data-checkout="issuer"
                  >
                    {allIssuers.length > 1 ? (
                      allIssuers.map((issuer, id) => (
                        <MenuItem key={id} value={issuer.id}>
                          {issuer.name}
                        </MenuItem>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.inputLabel}
                    id="installments-input-label"
                  >
                    Installments
                  </InputLabel>
                  <Select
                    type="text"
                    value={installmentState}
                    onChange={handleInstallmentChange}
                  >
                    {payerCosts.length > 1 ? (
                      payerCosts.map((payerCost, id) => (
                        <MenuItem key={id} value={payerCost.installments}>
                          {payerCost.recommended_message}
                        </MenuItem>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <input
                type="hidden"
                name="transactionAmount"
                id="transactionAmount"
                value={totalPrice}
              />
              <input
                type="hidden"
                name="paymentMethodId"
                id="paymentMethodId"
              />
              <Grid
                container
                xs={12}
                justify="center"
                alignItems="center"
                className={classes.buttonContainer}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={buttonDisabled}
                  className={classes.button}
                >
                  Pay
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>

      {/**<form action="http://localhost:3000/process_payment" method="post" id="paymentForm" onSubmit={getCardToken}>
        <InputLabel>Document Type</InputLabel>
        <select id="docType" name="docType" data-checkout="docType" type="text"></select>
        <InputLabel>Document Number</InputLabel>
        <input 
          name="docNumber"
          data-checkout="docNumber"
        />
        <InputLabel>Card Holder Name</InputLabel>
        <input 
          id="cardholderName"
          data-checkout="cardholderName"
        />
        <InputLabel>Card Number</InputLabel>
        <input 
          id="cardNumber"
          data-checkout="cardNumber"
          onChange={handleChange}
        />
        <InputLabel>Expiration Date</InputLabel>
        <input
          id="cardExpirationMonth" 
          type="text" 
          placeholder="MM" 
          data-checkout="cardExpirationMonth"
        />
        <input
          type="text" 
          placeholder="YY" 
          id="cardExpirationYear" 
          data-checkout="cardExpirationYear"
        />
        <InputLabel>Security Code</InputLabel>
        <input 
          id="securityCode"
          data-checkout="securityCode"
        />
        <InputLabel>Issuer</InputLabel>
        <select
          id="issuer"
          name="issuer"
          value={issuer}
          onChange={handleIssuerChange}
          data-checkout="issuer"
        >
        </select>
        <InputLabel>Installments</InputLabel>
        <select 
          type="text"
          id="installments"
          name="installments"
        >
        </select>
        <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
        <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
        <Button type="submit">Pay</Button>
      </form>**/}
    </>
  );
};

export default PaymentInfo;
