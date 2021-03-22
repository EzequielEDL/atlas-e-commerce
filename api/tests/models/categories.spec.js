const { expect } = require("chai");

const category = {
  name: "Telescopios",
  description: "Te permite ver más allá de lo apenas visible",
};

describe("Connection test", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Property Categories", () => {
    beforeEach(() => Categories.sync({ force: true }));

    describe("Create the model", () => {
      it("should be an object and to have a property known as name", () => {
        Categories.create(category).then((category) => {
          expect(category).to.be.an("object");
          expect(category).to.be.property("name");
        });
      });
      it("should have a property known as description", () => {
        Categories.create(category).then((category) => {
          expect(category).to.be.an("object");
          expect(category).to.be.property("description");
        });
      });
      it("the fields are correct", () => {
        Categories.create(category).then((category) => {
          expect(category.name).to.be.equal("Telescopios");
          expect(category.description).to.be.equal(
            "Te permite ver más allá de lo apenas visible"
          );
        });
      });
    });
  });
});
