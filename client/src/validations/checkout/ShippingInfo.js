export const shippingValidation = (formValues) => {
  let errors = {
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postalCode: "",
    email: "",
  };

  if (!formValues.country) {
    errors.country = "Country is required";
  } else if (formValues.country.length < 3) {
    errors.country = "Country is invalid";
  }

  if (!formValues.state) {
    errors.state = "State is required";
  } else if (formValues.state.length < 3) {
    errors.state = "State is invalid";
  }

  if (!formValues.city) {
    errors.city = "City is required";
  } else if (formValues.city.length < 3) {
    errors.city = "City is invalid";
  }

  if (!formValues.street) {
    errors.street = "Street is required";
  } else if (formValues.street.length < 3) {
    errors.street = "Street is invalid";
  }

  if (!formValues.number) {
    errors.number = "Street number is required";
  } else if (formValues.number.length < 3) {
    errors.number = "Street number is invalid";
  }

  if (!formValues.postalCode) {
    errors.postalCode = "Postal code is required";
  } else if (formValues.postalCode.length < 3) {
    errors.postalCode = "Postal code is invalid";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email)) {
    errors.email = "Email is invalid";
  }

  return errors;
};
