const { Order, Product } = require('../models').models;
const router = require('express').Router();

module.exports = router;

// router.get('/', (req, res, next) => {
//   return Product.findAll({})
//     .then(products => {
//       res.render('index', { products: products });
//     })
//     .catch(next);
// });

router.put('/:id', (req, res, next) => {
  Order.updateFromRequestBody(req.params.id, req.body)
    .then( () => res.redirect('/'))
    .catch(ex => {
      if (ex.message === 'address required') {
        return res.render('index', { error: ex });
      }
      next(ex);
    });
});

router.post('/:id/lineItems', (req, res, next) => {
  Order.addProductToCart(+req.body.productId)
    .then( () => res.redirect('/'))
    .catch(next);
});

router.delete('/:orderId/lineItems/:id', (req, res, next) => {
  Order.destroyLineItem(req.params.orderId, req.params.id)
    .then( () => res.redirect('/'))
    .catch(next);
});
