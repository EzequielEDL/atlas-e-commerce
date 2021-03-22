export const validations = (formValues) => {
  let errors = {
    name: "",
    email: "",
    password: "",
    matchedPassword: false,
  };

  if (!formValues.name) {
    errors.name = "Name is required";
  } else if (formValues.name.length < 3 || formValues.name.length > 20) {
    errors.name = "Name is invalid";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email)) {
    errors.email = "Email is invalid";
  }

  if (!formValues.password) {
    errors.password = "Password is required";
  } else if (
    formValues.password.length > 20 ||
    formValues.password.length < 6
  ) {
    errors.password = "Password is invalid";
  }

  if (formValues.password === formValues.passwordValidator) {
    errors.matchedPassword = true;
  } else {
    errors.matchedPassword = false;
  }

  return errors;
};
