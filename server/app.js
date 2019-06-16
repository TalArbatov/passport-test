const config = require('../config')
const express = require('express');
const applyMiddlewares = require('./middlewares');
const mongoose = require('mongoose');
const passport =require('passport')
const app = express();

//setup mongodb connection via mongoose ORM
mongoose.connect(config.mongoURI, {useNewUrlParser: true},(err) => {
  if(err) console.log(`Failed to connect to ${config.mongoURI}, Error message: ${err}`)
  else console.log(`Sucessfully connected to ${config.mongoURI}`)
})

require('./models/UserSchema');

require('./passport/local-signup');
require('./passport/local-login')

applyMiddlewares(app);

//require passport modules

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

