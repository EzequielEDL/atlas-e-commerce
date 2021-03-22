const server = require("express").Router();
const path = require("path");
const productsController = require("../../controllers/products.controller");
const protectorOfRoute = require("../../middlewares/routerProtector.middleware.js");
const cloudinary = require('cloudinary');



server.put("/:idProduct", protectorOfRoute('admin'), (req, res) => {
  let { name, description, price, stock } = req.body;

  let idProduct = req.params.idProduct;
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

        return productsController
          .updateProduct(idProduct, product)
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

server.put("/:productId/handle-stock", (req, res) => {
  console.log(req.body.buyedQuantity);
  console.log(typeof req.body.buyedQuantity);
  productsController
    .handleUpdateStock(
      parseInt(req.params.productId),
      parseInt(req.body.buyedQuantity)
    )
    .then((result) => {
      if (result.msg === "Product stock updated successfuly") {
        res.status(200).json({ msg: result.msg, product: result.product });
      } else if (result.msg === "Buyed quantity can't be a negative number") {
        res.status(400).json({ msg: result.msg });
      } else if (result.msg === "Buyed quantity is higher then stock") {
        res.status(400).json({
          msg: result.msg,
          stock: result.stock,
          productId: result.productId,
        });
      } else {
        res.status(400).json({ msg: "Something went wrong" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        msg: "ERROR: The product stock hasn't been updated",
        error: err,
      });
    });
});

module.exports = server;
