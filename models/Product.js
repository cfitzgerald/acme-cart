const db = require('./db');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
  },
});

Product.findProductsViewModel = function() {
  // to return viewModel as in acme-users-mentors
  return Promise.all([
    Product.findAll({}), // promises all products
    db.models.order.getCart(), // promises the one true cart
    db.models.order.findAll({ where: { isCart: false }, order: [['id', 'DESC']], include: [{ all: true, nested: true }]}), // promises orders + all associated
  ])
    .then(([ products, cart, orders ]) => {
      return { products, cart, orders };
    });
};

// exports
module.exports = Product;
