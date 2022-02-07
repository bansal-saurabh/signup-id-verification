var express = require('express');
var router = express.Router();

const successController = require('../controllers/successController');

/* GET success page. */
router.get('/', successController);

module.exports = router;
