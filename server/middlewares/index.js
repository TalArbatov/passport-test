const bodyParser = require('./bodyParser');
const router = require('./router');
const static = require('./static');
const cookieParser = require('./cookieParser');
const passport = require('./passport')
const misc = require('./misc')
const session = require('./session')


const middlewares = [bodyParser, cookieParser,session,misc, passport, router, static]

const applyMiddlewares = app => {
  middlewares.forEach(middleware => {
    return middleware(app);
  })
}

module.exports = applyMiddlewares