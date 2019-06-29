const config = require('../config')
const express = require('express');
const mongoose = require('mongoose');
const passport =require('passport')
const app = express();
const https = require('https');
const http = require('http')

//setup mongodb connection via mongoose ORM
mongoose.connect(config.mongoURI, {useNewUrlParser: true},(err) => {
  if(err) console.log(`Failed to connect to ${config.mongoURI}, Error message: ${err}`)
  else console.log(`Sucessfully connected to ${config.mongoURI}`)
})

require('./models/UserSchema');
require('./models/HubSchema');
require('./models/PostSchema');


require('./passport/facebook-login')
require('./passport/google-login')

require('./passport/local-signup');
require('./passport/local-login')
require('./passport/jwt')


const applyMiddlewares = require('./middlewares');

applyMiddlewares(app);

//require passport modules

const PORT = config.port;

http.createServer(app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//app.listen()


