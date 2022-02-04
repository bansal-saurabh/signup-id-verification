var express = require('express');
var router = express.Router();

const successController = require('../controllers/successController');

router.get('/', function(req, res, next) {
  res.send('respond with a get resource');
});

// router.post('/', function(req, res, next)  {
//   res.send('respond with a post resource');
// });

router.post('/', successController);

module.exports = router;
