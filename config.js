require('dotenv').config()

module.exports = {
  isPorduction: process.env.NODE_ENV === 'production' ? true : false,
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI,
  sessionSecret: this.isPorduction ? process.env.SESSION_SECRET : 'session secret',
  JWTsecret: this.isPorduction ? process.env.JWT_SECRET : 'jwt secret',
  JWTexp: 60 * 60 * 24, //one day
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  },
  google: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
}

