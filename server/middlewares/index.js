const bodyParser = require('./bodyParser');
const router = require('./router');
const static = require('./static');

const middlewares = [bodyParser, router, static]

const applyMiddlewares = app => {
  middlewares.forEach(middleware => {
    return middleware(app);
  })
}

module.exports = applyMiddlewares