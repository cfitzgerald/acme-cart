const db = require('./db');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    set: function(val) {
      if (val === 'true') {
        val = true;
      }
      if (val === 'false') {
        val = false;
      }
      this.setDataValue('isCart', val);
    }
  },
  address: {
    type: Sequelize.STRING,
  },
});

//////////////////
// hooks
Order.hook('beforeUpdate', function(item) {
  if (!item.isCart && !item.address) {
    throw new Error('address required!');
  }
});

//////////////////
// class methods

// get a cart!
Order.getCart = function() {
  // http://docs.sequelizejs.com/manual/tutorial/models-usage.html#including-everything
  // include -> nested loading for Products associated with LineItems (associated with orders)

  return Order.findOne({
    where: { isCart: true },
    // include: [{ all: true, nested: true }]
  })
    .then(cart => {
      // console.log('getCart -> cart = ', cart);
      // cart is null if no true isCarts
      if (!cart) {
        return Order.create({}); // create an Order...address?
      } else {
        return cart;
      }
    })
    .then(cart => {
      return Order.findById(cart.id, {
        include: {
          model: db.models.lineItem,
          include: [ db.models.product ]
        }
      });
    });
};

// Order.updateFromRequestBody(req.params.id, req.body)
// -- Place Order
Order.updateFromRequestBody = function(id, body) {
  // console.log('body = ', body);

  return Order.findById(id)
    .then(order => {
      Object.assign(order, body);
      return order.save();
    });

  // return Order.update({ address: body.address }, { where: { id: id } });
};

// Order.addProductToCart(+req.body.productId)
// -- Add to Cart
Order.addProductToCart = function(productId) {
  // console.log('productId = ', productId);

  return this.getCart()
    .then(cart => {
      // console.log('got a cart! ...', cart);
      // return cart.getLineItems(); // getter via hasMany assoc on Order
      let lineItem = cart.lineItems.find(lineItem => lineItem.productId === productId);
      if (lineItem) {
        lineItem.quantity++;
        return lineItem.save();
      }
      return db.models.lineItem.create({
        orderId: cart.id,
        productId: productId
      });
    });
};

// Order.destroyLineItem(req.params.orderId, req.params.id)
// -- Remove From Cart
Order.destroyLineItem = function(orderId, itemId) {
  // console.log('itemId = ', itemId);

  return db.models.lineItem.destroy({ where: { id: itemId, orderId: orderId } });
};

//////////////////
// exports
module.exports = Order;
