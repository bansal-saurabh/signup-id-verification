var express = require('express');
var router = express.Router();

const verificationController = require('../controllers/verificationController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', verificationController);

module.exports = router;
