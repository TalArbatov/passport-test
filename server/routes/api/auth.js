const router = require('express').Router();
const passport = require('passport')

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
router.get('/local-login-success', (req,res,next) => {
  res.send('Success!')
})
router.get('/local-login-failure', (req,res,next) => {
  res.send(req.flash('error')[0])
})


module.exports = router;