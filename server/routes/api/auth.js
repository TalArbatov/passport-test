const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../../config');

router.get('/test', (req,res, next) => {
  res.send('API response from Express server')
})

router.post('/local-signup', passport.authenticate('local-signup', {
  successRedirect: '/api/auth/local-signup-success',
  failureRedirect: '/api/auth/local-signup-failure',
  failureFlash:true
}));

router.get('/local-signup-failure', (req,res, next) => {
  res.send(req.flash('error')[0])
})

router.get('/local-signup-success', (req,res,next) => {
  res.send('success!')
})

router.post('/local-login', passport.authenticate('local-login', {
  failureFlash: true,
  failureRedirect: '/api/auth/local-login-failure',
  successRedirect: '/api/auth/local-login-success'
}))


router.get('/local-login-success', (req,res) => {
  //passport handler attachtest req.user
  const user = {
    _id: req.user._id,
    email: req.user.email
  }
  const secret = config.JWTsecret;
  jwt.sign(user, secret,{ expiresIn: 60 }, (err, token) => {
    if(err) res.status(501)
    else res.send(token)
  })

})

router.get('/protected', require('../../middlewares/checkJWT'), (req,res,next) => {
  res.send('success!')
});
router.get('/protected2', passport.authenticate('jwt'), (req,res,next) => {
  res.send('success!2')
});

module.exports = router;