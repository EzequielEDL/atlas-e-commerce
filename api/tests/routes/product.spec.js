const { expect } = require('chai');
const session = require('supertest-session');
const path = require('path');
const app = require('../../src/app.js');
const { Product, Categories, conn } = require('../../src/database/db');

const imageOne = [path.join(__dirname, '../images/imageTest.jpeg')]

const agent = session(app);

const product = {
  name: 'pedro',
  description: 'some beautiful description',
  price: 20,
  stock: 1,
  rating: 0,
  images: imageOne 
};

describe('PRODUCT routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
  }));

  before(() => {
    Product.create(product)
    Categories.create({name: 'one', description: 'number'})
    Categories.create({name: 'spaceXCategory', description: 'cool birds'})
      })

  describe('GET ', () => {
    describe('/products', () => {
      
      it('should get 200', () => {
        return agent
          .get('/products').expect(200)
      });

      it('should return the products as array', () => {
        return agent
        .get('/products').expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('pedro')
          expect(res.body[0].description).to.be.equal('some beautiful description')
        })
      })

    describe('/products/search/?', () => {
      it('should return the searched products', () => {
        return agent
          .get('/products/search/?value=pedro').expect(200)
          .then((res) => {
            expect(res.body[0].name).to.be.equal('pedro')
            expect(res.body[0].description).to.be.equal('some beautiful description')
            expect(res.body[0].price).to.be.equal(20)
            expect(res.body[0].stock).to.be.equal(1)
            expect(res.body[0].rating).to.be.equal(0)
            expect(res.body[0].images).to.deep.equal(imageOne)
          })
        })
      })
    })

    describe('/products/category/:name', () => {
  
      it('search the products by category', () => {
        return agent
          .get('/products/search/category/spaceXCategory')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.deep.include({name: 'spaceXCategory'});
            expect(res.body[0]).to.deep.include({description: 'cool birds'});
            expect(res.body[0]).to.have.property('products')
          });
      });
    });
  })

  describe('POST', () => {
  

    describe('/products', () => {
      it('Guarda un producto en la base de datos', () => {
        return agent
          .post('/products')
          .send(product)
          .expect(200)
          .then(res => {
            expect(res.body[0]).to.deep.include({name: 'pedro'})
          });
      });
    });

    describe('/products/category', () => {

      it('should create the category with the given name', () => {
        return agent
          .post('/products/category')
          .send({name: 'spaceX', description: 'we do cool stuff'})
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.include({name: 'spaceX'})
          })
      })
      it('should create the category with the given description', () => {
        return agent
          .post('/products/category')
          .send({name: 'toniStars', description: 'we do cool stuff too'})
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.include({description: 'we do cool stuff too'})
          })
        })
    })
  })

  describe('PUT ', () => {
    describe('/products', () => {
      it('should get 200', (done) => {
        return agent
          .put('/products/1')
          .expect(200)
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'pedro')
          .field('description', 'some beautiful description')
          .field('price', 20)
          .field('stock', 1)
          .field('rating', 0)
          .field('images', imageOne)
          .then((res) => {
            expect(res.body).to.be.deep.equal({msg: 'Product updated successfuly'});
          })
          .catch(done())
      })
    })

    describe('/products/category/:id', ()=>{
      it('should update the fields', (done) => {
        return agent
          .put('/products/category/1')
          .expect(200)
          .send({name:'telescopy', description:'look up in the sky, now you see the stars'})
          .then((res) => {
            expect(res.body).to.deep.equal([1]);
          })
          .then(()=>{
            return Categories.findOne({where:{id: 1}})
          })
          .then((cat) => {
            expect(cat).to.have.property('name')
            expect(cat).to.have.property('description')
            expect(cat.name).to.be.equal('telescopy')
            expect(cat.description).to.be.equal('look up in the sky, now you see the stars')
          })
          .catch(done())
      })
    })
  })

  describe('DELETE', () => {
    describe('/products/id', () => {
      it('should delete the product', () => {
        return agent
          .delete(`/products/${1}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.deep.equal({ msg: 'Product deleted successfully' })
          })
      })
    })

    describe('DELETE /products/category/:id', () => {
      it('should delete the correct category', () => {
        return agent 
          .delete(`/products/category/${2}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.deep.equal({msg: "Category deleted successfully"})
        })
      })
    })
  })

  
  describe('relationship product category', () => {

    let productIdTwo = [];
    let categoryIdTwo = [];
      
    before('add product and category', () => {
      Product.findAll()
        .then((products) => {
          productIdTwo.push(products[0].id)
          return Categories.findAll()
        })
        .then((categories) => {
          categoryIdTwo.push(categories[0].id)
        })
    })

    describe('POST /:idProduct/category/:idCategory', ()=>{
      it('should set a category to product by id',()=>{
        return agent
          .post(`/products/${2}/category/${3}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.deep.equal({ msg: 'Category added to product successfuly' })
          })
        })
    })

    describe('DELETE /:idProduct/category/:idCategory', () => {
      it('should delete category by product ID', () => {
        return agent
          .delete(`/products/${2}/category/${3}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.deep.equal({msg: 'Category deleted from product successfully'})
          })
      })
    })
  })
})

