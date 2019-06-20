require('dotenv').config()

module.exports = {
  isPorduction: process.env.NODE_ENV === 'production' ? true : false,
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI,
  sessionSecret: this.isPorduction ? process.env.SESSION_SECRET : 'session secret',
  JWTsecret: this.isPorduction ? process.env.JWT_SECRET : 'jwt secret'
}

