const db = require('./db');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

// exports
module.exports = LineItem;
