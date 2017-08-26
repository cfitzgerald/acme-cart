const app = require('./app');
const port = process.env.PORT || 3000;

// db
const models = require('./models');

// sync, seed, and listen
models.sync()
  .then( () => {
    return models.seed();
  })
  .then( (seed) => {
    app.listen(port, () => {
      console.log(`acme-cart listening on ${port}...`);
    });
  })
  .catch(console.error);
