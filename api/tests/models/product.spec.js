const { Product, Categories, conn } = require("../../src/database/db");
const { DataTypes } = require("sequelize");
const { expect } = require("chai");

describe("Connection test", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Products", () => {
    beforeEach(() => Product.sync({ force: true }));
    describe("name", () => {
      it("should work when its a valid name", () => {
        Product.create({
          name: "Producto",
          description: "some description",
          price: 1,
          images: ["imageOne", "imageTwo"],
        }).then((product) => {
          expect(product.name).to.equal("Producto");
        });
      });
    });

    describe("description", () => {
      it("should work when its a valid description", () => {
        Product.create({
          name: "Producto",
          description: "some description",
          price: 1,
          images: ["imageOne", "imageTwo"],
        }).then((product) => {
          expect(product.description).to.equal("some description");
        });
      });
    });

    describe("price", () => {
      it("should work when its a valid price", () => {
        Product.create({
          name: "Producto",
          description: "some description",
          price: 1,
          images: ["imageOne", "imageTwo"],
        }).then((product) => {
          expect(product.price).to.equal(1);
        });
      });
    });

    describe("images", () => {
      it("should work when its a valid images", () => {
        Product.create({
          name: "Producto",
          description: "some description",
          price: 1,
          images: [],
        }).then((product) => {
          expect(product.images).to.deep.equal([]);
        });
      });
    });
  });
});
