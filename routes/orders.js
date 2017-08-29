const { Order, Product } = require('../models').models;
const router = require('express').Router();

module.exports = router;

router.put('/:id', (req, res, next) => {
  console.log('calling update FromRequestBody()...');
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
  // console.log('calling addProductToCart()...');
  Order.addProductToCart(+req.body.productId)
    .then( () => res.redirect('/'))
    .catch(next);
});

router.delete('/:orderId/lineItems/:id', (req, res, next) => {
  // console.log('calling destroyLineItem()...');
  Order.destroyLineItem(req.params.orderId, req.params.id)
    .then( () => res.redirect('/'))
    .catch(next);
});
