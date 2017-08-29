const db = require('./db');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// class methods

// get a cart!
Order.getCart = function() {
  // http://docs.sequelizejs.com/manual/tutorial/models-usage.html#including-everything
  // include -> nested loading for Products associated with LineItems (associated with orders)
  return Order.findOne({ where: { isCart: true }, include: [{ all: true, nested: true }] })
    .then(cart => {
      // console.log('getCart -> cart = ', cart);
      // cart is null if no true isCarts
      if (cart === null) {
        return Order.create({}); // create an Order...address?
      } else {
        return cart;
      }
    });
};

// Order.updateFromRequestBody(req.params.id, req.body)
// -- Place Order
Order.updateFromRequestBody = function(id, body) {
  // console.log('body = ', body);
  return Order.update({ address: body.address }, { where: { id: id } });
};

// Order.addProductToCart(+req.body.productId)
// -- Add to Cart
Order.addProductToCart = function(productId) {
  // console.log('productId = ', productId);

  // need to add product as line item...
  // if product already exists in cart, just update the LineItem quantity
  // else, add to cart

  // find product -> Promise
  // let productToBeAdded = Product.findById(productId);

  return Order.getCart()
    .then(cart => {
      // console.log('got a cart! ...', cart);
      return cart.getLineItems(); // getter via hasMany assoc on Order
    })
    .then(lineItems => {
      // console.log('lineItems = ', lineItems);
      // https://www.linkedin.com/pulse/javascript-find-object-array-based-objects-property-rafael
      const isProductALineItem = lineItems.find(lineItem => {
        return lineItem.dataValues.productId === productId;
      });
      console.log('isProductALineItem = ', isProductALineItem);
      return isProductALineItem;
      // need es6 .find() to work + additional logic for if product exists -> quantity ++
    });
};

// Order.destroyLineItem(req.params.orderId, req.params.id)
// -- Remove From Cart
Order.destroyLineItem = function(orderId, itemId) {
  // console.log('itemId = ', itemId);
  return db.models.lineItem.destroy({ where: { id: itemId } }); // orderId?
};

// exports
module.exports = Order;
