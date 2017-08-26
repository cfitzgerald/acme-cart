const db = require('./db');

// models
const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');

// associations



// sync
const sync = () => {
  return db.sync({ force: true });
};

// seed
const seed = () => {
  return require('./seed')(LinteItem, Order, Product);
};

// exports
module.exports = {
  models: { LineItem, Order, Product },
  sync,
  seed,
};
