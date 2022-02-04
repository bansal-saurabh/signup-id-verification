var express = require('express');
var router = express.Router();

/* GET Sign Up page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'SocialYoti' });
  next()
});

module.exports = router;
