const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/hub', require('./hub'));
module.exports = router;