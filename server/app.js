const config = require('../config')
const express = require('express');
const applyMiddlewares = require('./middlewares');

const app = express();

applyMiddlewares(app);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})


