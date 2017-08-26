const bodyParser = require('body-parser');
const express = require('express');
const override = require('method-override');
const morgan = require('morgan');
const path = require('path');
const pug = require('pug');

const app = express();

// models
const { LineItem, Order, Product } = require('./models').models;

// middleware
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public')); // serve up the static files in /public
app.use(bodyParser.urlencoded({ extended: false }));
app.use(override('_method')); // use the _method param on the url
app.use(morgan('dev'));

// pug setup
app.set('views', './views'); // set 'views' to specify the templates dir
app.set('view engine', 'pug'); // set 'view engine' to specify pug

// handle the root route
app.get('/', (req, res, next) => {
  return Product.findAll({})
    .then(products => {
      res.render('index', { products: products });
    })
    .catch(next);
});

// handle routes to orders.js
app.use('/orders', require('./routes/orders'));

// handle errors
app.use( (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

// exports
module.exports = app;
