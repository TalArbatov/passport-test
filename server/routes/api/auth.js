const router = require('express').Router();
const passport = require('passport')
router.get('/login', (req,res,next) => {
  res.send('test')
})

router.get('/test', (req,res, next) => {
  res.send('API response from Express server')
})

router.post('/local-signup', (req,res, next) => {
  console.log('start')

  passport.authenticate('local-signup', (err, user, info) => {
    if(err) return next(err);
    if(!user) return res.status(409);
    res.send('success!')
  })
});
module.exports = router;