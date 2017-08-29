const db = require('./db');

// models
const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');

// associations
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

// sync
const sync = () => {
  return db.sync({ force: true });
};

// seed
const seed = () => {
  return require('./seed')(Product, LineItem, Order);
};

// exports
module.exports = {
  models: { LineItem, Order, Product },
  sync,
  seed,
};
