/**
 * Copyright 2022 https://saurabhbansal.me
 * @author Saurabh Bansal
 */

var express = require('express');
var router = express.Router();

/* GET sign Up page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'SocialYoti' });
  next()
});

module.exports = router;
