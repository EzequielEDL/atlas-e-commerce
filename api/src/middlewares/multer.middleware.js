const server = require("express").Router();
const path = require("path");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads/"),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).array("images", 6);

server.use(upload);

module.exports = server;
