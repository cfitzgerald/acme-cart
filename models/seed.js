module.exports = (Product) => {
  let product1, product2, product3;
  return Promise.all([
    Product.create({ name: 'Plumbus' }),
    Product.create({ name: 'The Worst Product' }),
    Product.create({ name: 'The Best Product' }),
  ])
  .then(([ _product1, _product2, _product3 ]) => {
    product1 = _product1;
    product2 = _product2;
    product3 = _product3;
    return {
      product1,
      product2,
      product3,
    };
  });
};
