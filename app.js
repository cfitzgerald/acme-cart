const bodyParser = require('body-parser');
const express = require('express');
const override = require('method-override');
const morgan = require('morgan');
const path = require('path');
const pug = require('pug');

const app = express();

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
app.use('/', (req, res, next) => {
  res.render('index', { nav: 'home '});
});

// handle routes to orders.js
app.use('/orders', require('./routes/orders'));

// handle errors
app.use( (err, req, res, next) => {
  console.error(err);
  res.render('error', { error: err });
});

// exports
module.exports = app;
