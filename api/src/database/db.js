require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// pg connection
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: "postgres",
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
}});

// localhost connection
/*const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_TABLE, DB_PORT
} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_TABLE}`, {
  logging: false, 
  native: false, 
});*/

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "./../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "./../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {
  Product,
  Categories,
  User,
  Cart,
  OrderLine,
  Review,
  UserInfo,
} = sequelize.models;

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsToMany(Product, { through: OrderLine });
Product.belongsToMany(Cart, { through: OrderLine });
Cart.hasMany(OrderLine);
OrderLine.belongsTo(Cart);
Product.hasMany(OrderLine);
OrderLine.belongsTo(Product);

UserInfo.belongsTo(Cart);
Cart.hasOne(UserInfo);

Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsToMany(Categories, {
  through: "Products_Categories",
  as: "categories",
});
Categories.belongsToMany(Product, {
  through: "Products_Categories",
  as: "products",
});

User.beforeCreate(async (user) => {
  if (user.password_virtual) {
    const hashedPassword = await bcrypt.hash(user.password_virtual, 10);
    user.password = hashedPassword;
  }
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
