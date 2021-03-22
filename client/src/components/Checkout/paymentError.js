export const paymentError = (err) => {
  let errMessage = "";

  if (err.status_detail && err.status_detail === "cc_rejected_other_reason") {
    errMessage = "Your payment was rejected by general error.";
  }

  if (
    err.status_detail &&
    err.status_detail === "cc_rejected_call_for_authorize"
  ) {
    errMessage = "Your payment was rejected with validation to authorize.";
  }

  if (
    err.status_detail &&
    err.status_detail === "cc_rejected_insufficient_amount"
  ) {
    errMessage = "Your payment was rejected for insufficient amount.";
  }

  if (
    err.status_detail &&
    err.status_detail === "cc_rejected_bad_filled_security_code"
  ) {
    errMessage = "Your payment was rejected by invalid security code.";
  }

  if (
    err.status_detail &&
    err.status_detail === "cc_rejected_bad_filled_date"
  ) {
    errMessage =
      "Your payment was rejected due to problem with expiration date.";
  }

  if (
    err.status_detail &&
    err.status_detail === "cc_rejected_bad_filled_other"
  ) {
    errMessage = "Your payment was rejected by error in the form.";
  }

  return errMessage;
};
