const server = require("express").Router();
const productController = require("../../controllers/products.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");
const cloudinary = require('cloudinary');
const path = require("path");

server.post("/", protectorOfRoute('admin'), (req, res) => {
  let { name, description, price, stock } = req.body;
  let images = req.files;
  let imageContainer = [];

  if (images && images.length >= 1) {
    for (let i = 0; i < images.length; i++) {
      imageContainer.push(images[i].filename);
    }
  }

  if (imageContainer.length < 1) {
    imageContainer.push("default.jpeg");
  }

  
  let imageUrlContainer = []
  for (let i in imageContainer) {

    cloudinary.uploader.upload(path.join(__dirname, '../../../uploads/' + imageContainer[i]))
      .then(function (image) {

        imageUrlContainer.push(image.secure_url)
        console.log(image.secure_url)
        if (imageUrlContainer.length === imageContainer.length) {

        const product = {
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          stock: parseInt(stock),
          images: imageUrlContainer
        };

        return productController
          .createProduct(product)
          .then((product) => {
            return res.status(200).json({msg: "Product created successfuly.", product});
          })
          .catch((err) => {return res.status(400).json(err)});
        }

    })
    .catch(function (err) {
      if (err) { return res.status(400).json(err)}
    });

  }

});

module.exports = server;
