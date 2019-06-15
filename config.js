require('dotenv').config()

module.exports = {
  isPorduction: process.env.NODE_ENV === 'production' ? true : false,
  port: process.env.PORT || 3000,

}

