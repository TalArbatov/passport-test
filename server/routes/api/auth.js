const router = require('express').Router();

router.get('/login', (req,res,next) => {
  res.send('test')
})

module.exports = router;