module.exports = (Product, LineItem, Order) => {
  return Product.bulkCreate([
    { name: 'Plumbus' },
    { name: 'The Worst Product' },
    { name: 'The Best Product' },
  ])
    .then(products => {
      return Order.bulkCreate([
        { isCart: true, address: 'NYC' },
        { isCart: false, address: 'Australia' },
      ]);
    })
    .then(orders => {
      return LineItem.bulkCreate([
        { productId: 1, orderId: 1, quantity: 99 },
        { productId: 2, orderId: 1, quantity: 1 },
        { productId: 3, orderId: 2, quantity: 1 },
      ]);
    })
};
