export const validations = (formInput) => {
  let errors = {
    name: "",
    description: "",
    price: "",
    stock: "",
    images: ""
  };

  if (!formInput.name) errors.name = "Name is required";
  if (!formInput.description) errors.description = "Description is required";
  if (!formInput.price) errors.price = "Price is required";
  if (!formInput.stock) errors.stock = "Stock is required";
  if (formInput.images < 1) errors.images = "Images is required";

  return errors;
};
