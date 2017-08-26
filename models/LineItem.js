const db = require('./db');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
  }
});

// exports
module.exports = LineItem;
