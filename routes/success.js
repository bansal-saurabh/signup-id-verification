var express = require('express');
var router = express.Router();

const successController = require('../controllers/successController');

router.get('/', successController);

module.exports = router;
