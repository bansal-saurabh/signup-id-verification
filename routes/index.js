/**
 * Copyright 2022 https://saurabhbansal.me
 * @author Saurabh Bansal
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SocialYoti' });
});

module.exports = router;
