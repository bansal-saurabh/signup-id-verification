/**
 * Copyright 2022 https://saurabhbansal.me
 * @author Saurabh Bansal
 */

var express = require('express');
var router = express.Router();

const verificationController = require('../controllers/verificationController');

/* GET verification page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST verification page. */
router.post('/', verificationController);

module.exports = router;
