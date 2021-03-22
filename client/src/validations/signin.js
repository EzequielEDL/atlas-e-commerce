export const validations = (formValues) => {
  let errors = {
    email: "",
    password: "",
  };

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

  return errors;
};
